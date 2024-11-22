namespace Mongo_Server.DTOs
{
    public class Order_ProductDTO
    {
        public required long Order_Code { get; set; } // PK, FK
        public required long Product_Code { get; set; } // PK, FK
        public required long Amount { get; set; }
    }
}