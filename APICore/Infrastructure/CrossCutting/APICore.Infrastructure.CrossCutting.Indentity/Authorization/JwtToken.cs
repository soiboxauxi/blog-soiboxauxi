using System;
using System.Collections.Generic;
using System.Text;

namespace APICore.Infrastructure.CrossCutting.Indentity.Authorization
{
    public class JwtToken
    {
        public string JwtId { get; set; }
        public string AccessToken { get; set; }
    }
}
