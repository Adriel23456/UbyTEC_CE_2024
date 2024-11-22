using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Code")]
        public string Code { get; set; } // Original PK

        [BsonElement("State")]
        public required string State { get; set; } // "Preparando", "Listo para envio", etc.

        [BsonElement("TotalService")]
        public decimal? TotalService { get; set; } // Assigned automatically

        [BsonElement("Direction")]
        public string? Direction { get; set; }

        [BsonElement("Client_Id")]
        public required string Client_Id { get; set; }

        [BsonElement("FoodDeliveryMan_UserId")]
        public string? FoodDeliveryMan_UserId { get; set; }
    }
}
