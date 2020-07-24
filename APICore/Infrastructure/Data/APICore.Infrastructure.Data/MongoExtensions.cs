using APICore.Domain.Core.Events;
using APICore.Infrastructure.CrossCutting.Indentity.Authorization;
using APICore.Infrastructure.CrossCutting.Indentity.MongoDb.Mongo;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace APICore.Infrastructure.Data.Extensions
{
    public static class MongoExtensions
    {
        public static IServiceCollection AddMongoDbExtensions(this IServiceCollection services, Action<MongoOptions> setupDatabaseAction)
        {
            var dbOptions = new MongoOptions();
            setupDatabaseAction(dbOptions);

            var storedEventCollection = MongoUtil.FromConnectionString<StoredEvent>(dbOptions.ConnectionString, dbOptions.StoredEventCollection);
            var refreshTokenCollection = MongoUtil.FromConnectionString<RefreshToken>(dbOptions.ConnectionString, dbOptions.RefreshTokenCollection);

            services.AddSingleton(x => storedEventCollection);
            services.AddSingleton(x => refreshTokenCollection);

            return services;
        }
    }
}
