namespace Mongo_Server.DTOs
{
    public class ProductPhotoDTO
    {
        public required long Product_Code { get; set; } // PK, FK
        public required string PhotoURL { get; set; } // PK
    }
}