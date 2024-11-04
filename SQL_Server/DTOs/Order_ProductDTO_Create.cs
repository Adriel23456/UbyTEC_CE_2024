namespace SQL_Server.DTOs
{
    public class Order_ProductDTO_Create
    {
        public required long Order_Code { get; set; } // FK
        public required long Product_Code { get; set; } // FK
    }
}