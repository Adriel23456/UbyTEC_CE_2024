using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class ProofOfPayment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Code { get; set; } // PK, auto-generated

        [Required]
        public required string CreditCardName { get; set; }

        [Required]
        public required long LastDigitsCreditCard { get; set; }

        public long? TotalPayment { get; set; } // Assigned automatically

        [Required]
        [RegularExpression(@"\d{2}-\d{2}-\d{4}", ErrorMessage = "Date must be in the format dd-mm-yyyy")]
        public required string Date { get; set; } // Format "dd-mm-yyyy"

        [Required]
        [RegularExpression(@"\d{2}:\d{2}", ErrorMessage = "Time must be in the format mm:hh")]
        public required string Time { get; set; } // Format "mm:hh"

        public string? ClientFullName { get; set; } // Assigned automatically

        public long? ClientPhone { get; set; } // Assigned automatically

        [Required]
        [ForeignKey("Order")]
        public required long Order_Code { get; set; } // FK to Order.Code

        // Navigation property
        [JsonIgnore]
        public Order? Order { get; set; }
    }
}