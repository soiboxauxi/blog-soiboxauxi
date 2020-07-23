using APICore.Domain.Core.Bus;
using APICore.Domain.Core.Events;
using APICore.Domain.Core.Notifications;
using APICore.Domain.Interfaces;
using APICore.Infrastructure.CrossCutting.Bus;
using APICore.Infrastructure.CrossCutting.Indentity.Models;
using APICore.Infrastructure.Data.EventSourcing;
using APICore.Infrastructure.Data.Repository.EventSourcing;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace APICore.Infrastructure.CrossCutting.IoC
{
    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // ASP.NET HttpContext dependency
            services.AddHttpContextAccessor();
            // services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Domain Bus (Mediator)
            services.AddScoped<IMediatorHandler, InMemoryBus>();

            // Domain - Events
            services.AddScoped<INotificationHandler<DomainNotification>, DomainNotificationHandler>();

            // Infra - Data EventSourcing
            services.AddScoped<IEventStoreRepository, EventStoreMongoDbRepository>();
            services.AddScoped<IEventStore, NoSqlEventStore>();

            // Infra - Identity
            services.AddScoped<IUser, AspNetUser>();
        }
    }
}
