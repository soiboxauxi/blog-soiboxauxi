using System;
using System.Collections.Generic;
using System.Text;

namespace APICore.Infrastructure.CrossCutting.Indentity.Models.AccountViewModels
{
    public class TokenViewModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
