using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generated
        public long Code { get; set; } // PK

        [Required]
        public required string Name { get; set; }

        [Required]
        public required long Price { get; set; }

        [Required]
        public required string Category { get; set; }

        [Required]
        [ForeignKey("BusinessAssociate")]
        public required long BusinessAssociate_Legal_Id { get; set; } // FK to BusinessAssociate.Legal_Id

        // Navigation properties
        [JsonIgnore]
        public BusinessAssociate? BusinessAssociate { get; set; }

        [JsonIgnore]
        public ICollection<ProductPhoto> ProductPhotos { get; set; } = new List<ProductPhoto>();
        [JsonIgnore]
        public ICollection<Cart_Product> Cart_Products { get; set; } = new List<Cart_Product>();
        [JsonIgnore]
        public ICollection<Order_Product> Order_Products { get; set; } = new List<Order_Product>();
    }
}