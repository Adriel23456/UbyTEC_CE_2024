using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.DTOs
{
    public class ProductDTO
    {
        public long? Code { get; set; } // PK
        public required string Name { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public required decimal Price { get; set; }
        public required string Category { get; set; }
        public required long BusinessAssociate_Legal_Id { get; set; } // FK
    }
}