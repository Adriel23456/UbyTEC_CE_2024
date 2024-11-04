namespace SQL_Server.DTOs
{
    public class BusinessManagerDTO_AuthResponse
    {
        public required BusinessManagerDTO BusinessManager { get; set; }
        public required BusinessAssociateDTO BusinessAssociate { get; set; }
    }
}