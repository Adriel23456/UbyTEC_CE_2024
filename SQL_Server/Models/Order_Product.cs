using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Order_Product
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Order")]
        public required int Order_Code { get; set; } // PK, FK to Order.Code

        [Key, Column(Order = 1)]
        [ForeignKey("Product")]
        public required int Product_Code { get; set; } // PK, FK to Product.Code

        [Required]
        public int Amount { get; set; } // Starts at 1, assigned automatically

        // Navigation properties
        [JsonIgnore]
        public Order? Order { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }
    }
}