namespace SQL_Server.DTOs
{
    public class ProductDTO_Create
    {
        public required string Name { get; set; }
        public required int Price { get; set; }
        public required string Category { get; set; }
        public required int BusinessAssociate_Legal_Id { get; set; } // FK
    }
}