using APICore.Domain.Core;
using APICore.Domain.Core.Events;
using APICore.Domain.Interfaces;
using APICore.Infrastructure.Data.Repository.EventSourcing;
using System.Text.Json;

namespace APICore.Infrastructure.Data.EventSourcing
{
    public class NoSqlEventStore : IEventStore
    {
        private readonly IEventStoreRepository _eventStoreRepository;
        private readonly IUser _user;

        public NoSqlEventStore(IEventStoreRepository eventStoreRepository, IUser user)
        {
            _eventStoreRepository = eventStoreRepository;
            _user = user;
        }

        public void Save<T>(T theEvent) where T : Event
        {
            var serializedData = JsonSerializer.Serialize(theEvent);

            var storedEvent = new StoredEvent(
                theEvent,
                serializedData,
                _user.Name);

            _eventStoreRepository.StoreAsync(storedEvent);
        }
    }
}
