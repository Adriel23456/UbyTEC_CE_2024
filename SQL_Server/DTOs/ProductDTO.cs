namespace SQL_Server.DTOs
{
    public class ProductDTO
    {
        public int? Code { get; set; } // PK
        public required string Name { get; set; }
        public required int Price { get; set; }
        public required string Category { get; set; }
        public required int BusinessAssociate_Legal_Id { get; set; } // FK
    }
}