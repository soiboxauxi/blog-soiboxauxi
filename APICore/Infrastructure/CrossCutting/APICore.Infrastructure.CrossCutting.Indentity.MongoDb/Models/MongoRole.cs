using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace APICore.Infrastructure.CrossCutting.Indentity.MongoDb.Models
{
    public class MongoRole : IdentityRole<ObjectId>
    {
        public MongoRole()
        {
            Claims = new List<IdentityRoleClaim<string>>();
        }

        public MongoRole(string name) : this()
        {
            Name = name;
            NormalizedName = name.ToUpperInvariant();
        }

        public override string ToString()
        {
            return Name;
        }

        public List<IdentityRoleClaim<string>> Claims { get; set; }
    }
}
