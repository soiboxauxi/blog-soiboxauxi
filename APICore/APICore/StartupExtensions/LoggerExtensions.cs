using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore.StartupExtensions
{
    public static class LoggerExtensions
    {
        public static IApplicationBuilder UseCustomizedLogger(this IApplicationBuilder builder, IConfiguration configuration,ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(configuration.GetSection("Logging"));
            return builder;
        }
    }
}
