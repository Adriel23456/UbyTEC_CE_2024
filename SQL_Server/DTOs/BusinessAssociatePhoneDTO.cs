namespace SQL_Server.DTOs
{
    public class BusinessAssociatePhoneDTO
    {
        public required int BusinessAssociate_Legal_Id { get; set; } // PK, FK
        public required int Phone { get; set; } // PK
    }
}