using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class FoodDeliveryManPhone
    {
        [ForeignKey("FoodDeliveryMan")]
        [Key]
        [Required]
        public required string FoodDeliveryMan_UserId { get; set; } // PK, FK to FoodDeliveryMan.UserId

        [Key]
        [Required]
        public required int Phone { get; set; } // PK

        // Navigation property
        [JsonIgnore]
        public FoodDeliveryMan? FoodDeliveryMan { get; set; }
    }
}