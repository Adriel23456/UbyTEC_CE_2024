using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class ProductPhoto
    {
        [ForeignKey("Product")]
        [Key]
        [Required]
        public required int Product_Code { get; set; } // PK, FK to Product.Code

        [Key]
        [Required]
        public required string PhotoURL { get; set; } // PK

        // Navigation property
        [JsonIgnore]
        public Product? Product { get; set; }
    }
}