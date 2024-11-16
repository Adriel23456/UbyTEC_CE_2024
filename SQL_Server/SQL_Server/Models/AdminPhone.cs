using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class AdminPhone
    {
        [ForeignKey("Admin")]
        [Key]
        [Required]
        public required long Admin_id { get; set; }

        [Key]
        [Required]
        public required long Phone { get; set; }

        // Propiedades de Navegación:
        [JsonIgnore]
        public Admin? Admin { get; set; }
    }
}