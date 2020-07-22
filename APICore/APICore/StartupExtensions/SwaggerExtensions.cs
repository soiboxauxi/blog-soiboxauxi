using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
                service.AddSwaggerGen();
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
}
