namespace SQL_Server.DTOs
{
    public class ProductDTO_Update
    {
        public required string Name { get; set; }
        public required long Price { get; set; }
        public required string Category { get; set; }
        public required long BusinessAssociate_Legal_Id { get; set; } // FK
    }
}