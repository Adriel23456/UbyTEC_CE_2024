using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class BusinessAssociatePhone
    {
        [ForeignKey("BusinessAssociate")]
        [Key]
        [Required]
        public required int BusinessAssociate_Legal_Id { get; set; } // PK, FK to BusinessAssociate.Legal_Id

        [Key]
        [Required]
        public required int Phone { get; set; } // PK

        // Navigation property
        [JsonIgnore]
        public BusinessAssociate? BusinessAssociate { get; set; }
    }
}