using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; } // PK, auto-generated

        public int? BusinessAssociate_Legal_Id { get; set; } // Assigned automatically

        public int? TotalProductsPrice { get; set; } // Assigned automatically

        [Required]
        [ForeignKey("Client")]
        public required int Client_Id { get; set; } // FK to Client.Id

        // Navigation properties
        [JsonIgnore]
        public Client? Client { get; set; }

        [JsonIgnore]
        public ICollection<Cart_Product> Cart_Products { get; set; } = new List<Cart_Product>();
    }
}