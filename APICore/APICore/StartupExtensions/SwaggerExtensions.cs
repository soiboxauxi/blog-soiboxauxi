using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.StartupExtensions
{
    public static class SwaggerExtensions
    {
        public static IServiceCollection AddCustomizedSwagger(this IServiceCollection service, IHostEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                // Register the Swagger generator, defining 1 or more Swagger documents
                service.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo
                    {
                        Version = "v1",
                        Title = "APICore",
                        Description = "",
                        Contact = new OpenApiContact { Name = "Sói", Email = "soiboxauxi@gmail.com", Url = new Uri("https://www.google.com/") },
                        License = new OpenApiLicense() { Name = "MIT", Url = new Uri("https://www.google.com/") }
                    });

                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });


                    c.OperationFilter<AuthorizeCheckOperationFilter>();

                    //c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    //{
                    //    {
                    //        new OpenApiSecurityScheme
                    //        {
                    //            Reference = new OpenApiReference
                    //            {
                    //                Type = ReferenceType.SecurityScheme,
                    //                Id = "Bearer"
                    //            },
                    //            Scheme = "oauth2",
                    //            Name = "Bearer",
                    //            In = ParameterLocation.Header,
                    //        },
                    //        new List<string>()
                    //        // new string[] { }
                    //    }
                    //});
                });
            }            

            return service;
        }

        public static IApplicationBuilder UseCustomizedSwagger(this IApplicationBuilder applicationBuilder, IWebHostEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                // Enable middleware to serve generated Swagger as a JSON endpoint.
                applicationBuilder.UseSwagger();

                // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
                // specifying the Swagger JSON endpoint.
                applicationBuilder.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            }

            return applicationBuilder;
        }
    }

    public class AuthorizeCheckOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var hasAuthorize =
              context.MethodInfo.DeclaringType.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any()
              || context.MethodInfo.GetCustomAttributes(true).OfType<AuthorizeAttribute>().Any();

            if (hasAuthorize)
            {
                operation.Responses.Add("401", new OpenApiResponse { Description = "Unauthorized" });
                operation.Responses.Add("403", new OpenApiResponse { Description = "Forbidden" });

                operation.Security = new List<OpenApiSecurityRequirement>
                {
                    //c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    //{
                    //    {
                    //        new OpenApiSecurityScheme
                    //        {
                    //            Reference = new OpenApiReference
                    //            {
                    //                Type = ReferenceType.SecurityScheme,
                    //                Id = "Bearer"
                    //            },
                    //            Scheme = "oauth2",
                    //            Name = "Bearer",
                    //            In = ParameterLocation.Header,
                    //        },
                    //        new List<string>()
                    //        // new string[] { }
                    //    }
                    //});
                    new OpenApiSecurityRequirement 
                    {
                        [
                            new OpenApiSecurityScheme 
                            {
                                Reference = new OpenApiReference 
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                },
                                Scheme = "oauth2",
                                Name = "Bearer",
                                In = ParameterLocation.Header,
                            }
                        ] = new[] {"api1"}
                    }
                };
            }
        }
    }
}
