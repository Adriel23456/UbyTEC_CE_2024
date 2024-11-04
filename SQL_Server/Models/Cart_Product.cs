using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Cart_Product
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Cart")]
        public required long Cart_Code { get; set; } // PK, FK to Cart.Code

        [Key, Column(Order = 1)]
        [ForeignKey("Product")]
        public required long Product_Code { get; set; } // PK, FK to Product.Code

        [Required]
        public long Amount { get; set; } // Starts at 1, assigned automatically

        // Navigation properties
        [JsonIgnore]
        public Cart? Cart { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
    }
}