using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.DTOs
{
    public class CartDTO
    {
        public long Code { get; set; } // PK
        public long? BusinessAssociate_Legal_Id { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalProductsPrice { get; set; }
        public required long Client_Id { get; set; } // FK
    }
}