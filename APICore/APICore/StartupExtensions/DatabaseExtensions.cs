using APICore.Infrastructure.Data.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.StartupExtensions
{
    public static class DatabaseExtensions
    {
        public static IServiceCollection AddCustomizedDatabase(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment env)
        {
            services.AddMongoDbExtensions(mongo =>
            {
                mongo.ConnectionString = configuration.GetConnectionString("DefaultConnection");
            });

            return services;
        }
    }
}
