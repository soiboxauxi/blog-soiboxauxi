using System;
using System.Collections.Generic;
using System.Text;

namespace APICore.Infrastructure.Data
{
    public class MongoOptions
    {
        public string ConnectionString { get; set; } = "mongodb://localhost/default";

        public string StoredEventCollection { get; set; } = "StoredEvent";
        public string RefreshTokenCollection { get; set; } = "RefreshToken";

    }
}
