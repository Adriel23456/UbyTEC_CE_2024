namespace SQL_Server.DTOs
{
    public class Order_ProductDTO_Create
    {
        public required int Order_Code { get; set; } // FK
        public required int Product_Code { get; set; } // FK
    }
}