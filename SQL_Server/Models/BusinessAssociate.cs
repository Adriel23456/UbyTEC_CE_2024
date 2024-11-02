using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class BusinessAssociate
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public required int Legal_Id { get; set; } // PK

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [RegularExpression("Aceptado|En espera|Rechazado", ErrorMessage = "State must be 'Aceptado', 'En espera', or 'Rechazado'")]
        public required string State { get; set; }

        [Required]
        public required string BusinessName { get; set; }

        public string? Direction { get; private set; } // Computed property

        [Required]
        public required string Province { get; set; }

        [Required]
        public required string Canton { get; set; }

        [Required]
        public required string District { get; set; }

        [Required]
        public required int SINPE { get; set; }

        public string? RejectReason { get; set; }

        [Required]
        [ForeignKey("BusinessManager")]
        public required string BusinessManager_Email { get; set; } // FK to BusinessManager.Email

        [Required]
        [ForeignKey("BusinessType")]
        public required int BusinessType_Identification { get; set; } // FK to BusinessType.Identification

        // Navigation properties
        [JsonIgnore]
        public BusinessManager? BusinessManager { get; set; }

        [JsonIgnore]
        public BusinessType? BusinessType { get; set; }

        [JsonIgnore]
        public ICollection<BusinessAssociatePhone> BusinessAssociatePhones { get; set; } = new List<BusinessAssociatePhone>();
        [JsonIgnore]
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}