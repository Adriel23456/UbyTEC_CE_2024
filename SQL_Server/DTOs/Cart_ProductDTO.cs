namespace SQL_Server.DTOs
{
    public class Cart_ProductDTO
    {
        public required long Cart_Code { get; set; } // PK, FK
        public required long Product_Code { get; set; } // PK, FK
        public required long Amount { get; set; }
    }
}