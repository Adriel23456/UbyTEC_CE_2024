using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class BusinessManagerPhone
    {
        [ForeignKey("BusinessManager")]
        [Key]
        [Required]
        public required string BusinessManager_Email { get; set; } // PK, FK to BusinessManager.Email

        [Key]
        [Required]
        public required long Phone { get; set; } // PK

        // Navigation property
        [JsonIgnore]
        public BusinessManager? BusinessManager { get; set; }
    }
}