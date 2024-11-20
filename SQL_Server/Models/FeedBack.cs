using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class Feedback
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // MongoDB auto-generated ID

        [BsonElement("Id_SQL")]
        public string Id_SQL {get;set;} //id en la base sql
        
        [BsonElement("FeedBack_Business")]
        public string FeedBack_Business { get; set; } = string.Empty;

        [BsonElement("BusinessGrade")]
        public double BusinessGrade { get; set; } // Must be between 0-5

        [BsonElement("FeedBack_Order")]
        public string FeedBack_Order { get; set; } = string.Empty;

        [BsonElement("OrderGrade")]
        public double OrderGrade { get; set; } // Must be between 0-5

        [BsonElement("FeedBack_DeliveryMan")]
        public string FeedBack_DeliveryMan { get; set; } = string.Empty;

        [BsonElement("DeliveryManGrade")]
        public double DeliveryManGrade { get; set; } // Must be between 0-5

        [BsonElement("FoodDeliveryMan_UserId")]
        public string FoodDeliveryMan_UserId { get; set; } = string.Empty; // Reference to DeliveryMan

        [BsonElement("Order_Code")]
        public long Order_Code { get; set; } // Reference to Order

        [BsonElement("BusinessAssociate_Legal_Id")]
        public long BusinessAssociate_Legal_Id { get; set; } // Reference to BusinessAssociate
    }
}
