namespace Mongo_Server.DTOs
{
    public class BusinessTypeDTO
    {
        public long? Identification { get; set; } // PK, auto-generated
        public required string Name { get; set; } // Unique
    }
}