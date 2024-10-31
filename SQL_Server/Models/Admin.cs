using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Admin
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required int Id { get; set; } // Número de cédula del admin

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string FirstSurname { get; set; }

        [Required]
        public required string SecondSurname { get; set; }

        [Required]
        public string? FullName { get; private set; }

        [Required]
        public required string Province { get; set; }

        [Required]
        public required string Canton { get; set; }

        [Required]
        public required string District { get; set; }

        [Required]
        public string? Direction { get; private set; }

        [Required]
        public required string UserId { get; set; }

        [Required]
        public required string Password { get; set; }

        // Propiedades de Navegación:
        [JsonIgnore]
        public ICollection<AdminPhone> AdminPhones { get; set; } = new List<AdminPhone>();
    }
}