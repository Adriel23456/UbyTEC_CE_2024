namespace SQL_Server.DTOs
{
    public class Cart_ProductDTO_Create
    {
        public required long Cart_Code { get; set; } // FK
        public required long Product_Code { get; set; } // FK
    }
}