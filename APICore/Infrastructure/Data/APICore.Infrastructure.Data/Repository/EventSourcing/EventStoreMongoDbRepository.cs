using APICore.Domain.Core.Events;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace APICore.Infrastructure.Data.Repository.EventSourcing
{
    public class EventStoreMongoDbRepository : IEventStoreRepository
    {
        private readonly IMongoCollection<StoredEvent> _eventStoreCollection;

        public EventStoreMongoDbRepository(IMongoCollection<StoredEvent> eventStoreCollection) 
        {
            _eventStoreCollection = eventStoreCollection;
        }

        public IList<StoredEvent> All(Guid aggregateId)
        {
            return _eventStoreCollection.Find(x => x.AggregateId == aggregateId).ToList();
        }
        
        public async void StoreAsync(StoredEvent theEvent)
        {
            await _eventStoreCollection.InsertOneAsync(theEvent);
        }
        
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing) { }
    }
}
