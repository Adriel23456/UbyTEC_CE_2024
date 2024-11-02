namespace SQL_Server.DTOs
{
    public class BusinessTypeDTO
    {
        public int? Identification { get; set; } // PK, auto-generated
        public required string Name { get; set; } // Unique
    }
}