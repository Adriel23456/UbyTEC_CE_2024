using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class BusinessManager
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required string Email { get; set; } // PK

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string FirstSurname { get; set; }

        [Required]
        public required string SecondSurname { get; set; }

        public string? FullName { get; private set; } // Computed property, set privately

        [Required]
        public required string Province { get; set; }

        [Required]
        public required string Canton { get; set; }

        [Required]
        public required string District { get; set; }

        public string? Direction { get; private set; } // Computed property, set privately

        [Required]
        public required string UserId { get; set; } // UNIQUE

        [Required]
        public required string Password { get; set; }

        // Navigation property
        [JsonIgnore]
        public ICollection<BusinessManagerPhone> BusinessManagerPhones { get; set; } = new List<BusinessManagerPhone>();
        [JsonIgnore]
        public BusinessAssociate? BusinessAssociate { get; set; }
    }
}