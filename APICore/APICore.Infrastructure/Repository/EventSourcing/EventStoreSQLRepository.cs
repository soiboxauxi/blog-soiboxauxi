using APICore.Domain.Core.Events;
using System;
using System.Collections.Generic;

namespace APICore.Infrastructure.Data.Repository.EventSourcing
{
    public class EventStoreSQLRepository : IEventStoreRepository
    {
        // private readonly EventStoreSqlContext _context;
        // 
        // public EventStoreSqlRepository(EventStoreSqlContext context)
        // {
        //     _context = context;
        // }
        // 
        // public IList<StoredEvent> All(Guid aggregateId)
        // {
        //     return (from e in _context.StoredEvent where e.AggregateId == aggregateId select e).ToList();
        // }
        // 
        // public void Store(StoredEvent theEvent)
        // {
        //     _context.StoredEvent.Add(theEvent);
        //     _context.SaveChanges();
        // }
        // 
        // public void Dispose()
        // {
        //     _context.Dispose();
        // }
        public IList<StoredEvent> All(Guid aggregateId)
        {
            throw new NotImplementedException();
        }

        public void Store(StoredEvent theEvent)
        {
            throw new NotImplementedException();
        }
    }
}
