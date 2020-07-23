namespace APICore.Infrastructure.CrossCutting.Indentity.MongoDb.Models
{
    public class TwoFactorRecoveryCode
    {
        public string Code { get; set; }

        public bool Redeemed { get; set; }
    }
}
