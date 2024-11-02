namespace SQL_Server.DTOs
{
    public class ProductPhotoDTO
    {
        public required int Product_Code { get; set; } // PK, FK
        public required string PhotoURL { get; set; } // PK
    }
}