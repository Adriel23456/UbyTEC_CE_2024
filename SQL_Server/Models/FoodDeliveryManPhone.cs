using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class FoodDeliveryManPhone
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("FoodDeliveryMan_UserId")]
        public required string FoodDeliveryMan_UserId { get; set; } // Original PK

        [BsonElement("Phone")]
        public required long Phone { get; set; } // Original PK
    }
}
