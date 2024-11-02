namespace SQL_Server.DTOs
{
    public class Order_ProductDTO
    {
        public required int Order_Code { get; set; } // PK, FK
        public required int Product_Code { get; set; } // PK, FK
        public required int Amount { get; set; }
    }
}