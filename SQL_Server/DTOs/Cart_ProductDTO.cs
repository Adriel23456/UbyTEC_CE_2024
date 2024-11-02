namespace SQL_Server.DTOs
{
    public class Cart_ProductDTO
    {
        public required int Cart_Code { get; set; } // PK, FK
        public required int Product_Code { get; set; } // PK, FK
        public required int Amount { get; set; }
    }
}