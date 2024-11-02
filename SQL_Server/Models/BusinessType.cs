using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class BusinessType
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generated
        public int? Identification { get; set; } // PK

        [Required]
        public required string Name { get; set; } // Unique

        // Navigation property
        [JsonIgnore]
        public ICollection<BusinessAssociate> BusinessAssociates { get; set; } = new List<BusinessAssociate>();
    }
}