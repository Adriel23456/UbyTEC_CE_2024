namespace SQL_Server.DTOs
{
    public class BusinessManagerPhoneDTO
    {
        public required string BusinessManager_Email { get; set; } // PK, FK
        public required int Phone { get; set; } // PK
    }
}