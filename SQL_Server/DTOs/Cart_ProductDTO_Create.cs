namespace SQL_Server.DTOs
{
    public class Cart_ProductDTO_Create
    {
        public required int Cart_Code { get; set; } // FK
        public required int Product_Code { get; set; } // FK
    }
}