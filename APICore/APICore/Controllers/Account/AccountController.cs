using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using APICore.Domain.Core.Bus;
using APICore.Domain.Core.Notifications;
using APICore.Infrastructure.CrossCutting.Indentity;
using APICore.Infrastructure.CrossCutting.Indentity.Authorization;
using APICore.Infrastructure.CrossCutting.Indentity.Models.AccountViewModels;
using APICore.Infrastructure.CrossCutting.Indentity.MongoDb.Models;
using APICore.Infrastructure.CrossCutting.Indentity.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APICore.Controllers.AccountController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<MongoRole> _roleManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            // RoleManager<ApplicationRole> roleManager,
            IJwtFactory jwtFactory,
            ILoggerFactory loggerFactory,
            INotificationHandler<DomainNotification> notifications,
            IMediatorHandler mediator) : base(notifications, mediator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            // _roleManager = roleManager;
            _jwtFactory = jwtFactory;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response();
            }

            // Sign In
            var signInResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, true);
            if (!signInResult.Succeeded)
            {
                NotifyError(signInResult.ToString(), "Login failure");
                return Response();
            }

            // Get User
            var appUser = await _userManager.FindByEmailAsync(model.Email);
            //var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);

            _logger.LogInformation(1, "User logged in.");
            return Response(await GenerateToken(appUser));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                NotifyModelStateErrors();
                return Response();
            }

            // Add User
            var appUser = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var identityResult = await _userManager.CreateAsync(appUser, model.Password);
            if (!identityResult.Succeeded)
            {
                AddIdentityErrors(identityResult);
                return Response();
            }

            // Add UserRoles
            identityResult = await _userManager.AddToRoleAsync(appUser, "Admin");
            if (!identityResult.Succeeded)
            {
                AddIdentityErrors(identityResult);
                return Response();
            }

            // Add UserClaims
            var userClaims = new List<Claim>
            {
                new Claim("Customers_Write", "Write"),
                new Claim("Customers_Remove", "Remove"),
            };
            await _userManager.AddClaimsAsync(appUser, userClaims);

            // SignIn
            //await _signInManager.SignInAsync(user, false);

            _logger.LogInformation(3, "User created a new account with password.");

            return Response();
        }

        private async Task<TokenViewModel> GenerateToken(ApplicationUser appUser)
        {
            // Init ClaimsIdentity
            var claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim(JwtRegisteredClaimNames.Email, appUser.Email));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, appUser.Id.ToString()));

            // Get UserClaims
            var userClaims = await _userManager.GetClaimsAsync(appUser);
            claimsIdentity.AddClaims(userClaims);

            // Get UserRoles
            var userRoles = await _userManager.GetRolesAsync(appUser);
            claimsIdentity.AddClaims(userRoles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));
            // ClaimsIdentity.DefaultRoleClaimType & ClaimTypes.Role is the same

            // Get RoleClaims
            foreach (var userRole in userRoles)
            {
                var role = await _roleManager.FindByNameAsync(userRole);
                var roleClaims = await _roleManager.GetClaimsAsync(role);
                claimsIdentity.AddClaims(roleClaims);
            }

            // Generate access token
            var jwtToken = await _jwtFactory.GenerateJwtToken(claimsIdentity);

            // Add refresh token
            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString("N"),
                UserId = appUser.Id.ToString(),
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMinutes(90),
                JwtId = jwtToken.JwtId
            };
            // await _dbContext.RefreshTokens.AddAsync(refreshToken);
            // await _dbContext.SaveChangesAsync();

            return new TokenViewModel
            {
                AccessToken = jwtToken.AccessToken,
                RefreshToken = refreshToken.Token,
            };
        }
    }
}
