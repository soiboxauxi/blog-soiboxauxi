using APICore.Infrastructure.CrossCutting.Indentity.Authorization;
using APICore.Infrastructure.CrossCutting.Indentity.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace APICore.Infrastructure.CrossCutting.Indentity.Services
{
    public interface IJwtFactory
    {
        Task<JwtToken> GenerateJwtToken(ClaimsIdentity claimsIdentity);
    }
}
