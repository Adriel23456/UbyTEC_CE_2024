using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class FoodDeliveryMan
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required string UserId { get; set; } // PK

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string FirstSurname { get; set; }

        [Required]
        public required string SecondSurname { get; set; }

        public string? FullName { get; private set; } // Computed property

        [Required]
        public required string Province { get; set; }

        [Required]
        public required string Canton { get; set; }

        [Required]
        public required string District { get; set; }

        public string? Direction { get; private set; } // Computed property

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string State { get; set; } // "Disponible" or "No disponible"

        // Navigation property
        [JsonIgnore]
        public ICollection<FoodDeliveryManPhone> FoodDeliveryManPhones { get; set; } = new List<FoodDeliveryManPhone>();
    }
}