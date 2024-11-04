using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Code { get; set; } // PK, auto-generated

        [Required]
        [RegularExpression("Preparando|Listo para envio|En camino|Finalizado|Cancelado")]
        public required string State { get; set; }

        public long? TotalService { get; set; } // Assigned automatically

        public string? Direction { get; set; } // Assigned automatically

        [Required]
        [ForeignKey("Client")]
        public required long Client_Id { get; set; } // FK to Client.Id

        [ForeignKey("FoodDeliveryMan")]
        public string? FoodDeliveryMan_UserId { get; set; } // FK to FoodDeliveryMan.UserId

        // Navigation properties
        [JsonIgnore]
        public Client? Client { get; set; }

        [JsonIgnore]
        public FoodDeliveryMan? FoodDeliveryMan { get; set; }

        [JsonIgnore]
        public ICollection<Order_Product> Order_Products { get; set; } = new List<Order_Product>();
        
        [JsonIgnore]
        public ProofOfPayment? ProofOfPayment { get; set; }

        [JsonIgnore]
        public FeedBack? FeedBack { get; set; }
    }
}