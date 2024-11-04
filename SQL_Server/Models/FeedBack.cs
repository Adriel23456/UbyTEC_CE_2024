using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SQL_Server.Models
{
    public class FeedBack
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; } // PK, auto-generated

        [Required]
        public required string FeedBack_Business { get; set; }

        [Required]
        [Range(0, 5)]
        public required double BusinessGrade { get; set; } // Must be between 0-5

        [Required]
        public required string FeedBack_Order { get; set; }

        [Required]
        [Range(0, 5)]
        public required double OrderGrade { get; set; } // Must be between 0-5

        [Required]
        public required string FeedBack_DeliveryMan { get; set; }

        [Required]
        [Range(0, 5)]
        public required double DeliveryManGrade { get; set; } // Must be between 0-5

        [Required]
        [ForeignKey("FoodDeliveryMan")]
        public required string FoodDeliveryMan_UserId { get; set; } // FK to FoodDeliveryMan.UserId

        [Required]
        [ForeignKey("Order")]
        public required long Order_Code { get; set; } // FK to Order.Code

        [Required]
        [ForeignKey("BusinessAssociate")]
        public required long BusinessAssociate_Legal_Id { get; set; } // FK to BusinessAssociate.Legal_Id

        // Navigation properties
        [JsonIgnore]
        public FoodDeliveryMan? FoodDeliveryMan { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        [JsonIgnore]
        public BusinessAssociate? BusinessAssociate { get; set; }
    }
}