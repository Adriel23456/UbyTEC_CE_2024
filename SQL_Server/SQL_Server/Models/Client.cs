using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Client
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required long Id { get; set; } // PK

        [Required]
        public required string UserId { get; set; } // Unique

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
        public required long Phone { get; set; }

        [Required]
        [RegularExpression(@"\d{2}-\d{2}-\d{4}", ErrorMessage = "BirthDate must be in the format dd-mm-yyyy")]
        public required string BirthDate { get; set; } // Format "dd-mm-yyyy"

        //Propiedades de navegacion
        [JsonIgnore]
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}