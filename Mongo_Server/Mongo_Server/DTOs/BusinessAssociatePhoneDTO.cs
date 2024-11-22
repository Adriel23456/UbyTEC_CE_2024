namespace Mongo_Server.DTOs
{
    public class BusinessAssociatePhoneDTO
    {
        public required long BusinessAssociate_Legal_Id { get; set; } // PK, FK
        public required long Phone { get; set; } // PK
    }
}