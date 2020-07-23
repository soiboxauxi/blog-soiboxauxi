using APICore.Domain.Core.Events;
using System;
using System.Collections.Generic;

namespace APICore.Infrastructure.Data.Repository.EventSourcing
{
    public interface IEventStoreRepository
    {
        void StoreAsync(StoredEvent theEvent);
        IList<StoredEvent> All(Guid aggregateId);
    }
}
