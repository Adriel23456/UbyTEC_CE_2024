using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.DTOs
{
    public class OrderDTO
    {
        public long Code { get; set; } // PK
        public required string State { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalService { get; set; }
        public string? Direction { get; set; }
        public required long Client_Id { get; set; } // FK
        public string? FoodDeliveryMan_UserId { get; set; } // FK
    }
}