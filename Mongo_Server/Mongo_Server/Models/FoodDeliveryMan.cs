using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class FoodDeliveryMan
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("UserId")]
        public required string UserId { get; set; } // Original PK

        [BsonElement("Name")]
        public required string Name { get; set; }

        [BsonElement("FirstSurname")]
        public required string FirstSurname { get; set; }

        [BsonElement("SecondSurname")]
        public required string SecondSurname { get; set; }

        [BsonElement("FullName")]
        public string? FullName { get; set; } // Computed property

        [BsonElement("Province")]
        public required string Province { get; set; }

        [BsonElement("Canton")]
        public required string Canton { get; set; }

        [BsonElement("District")]
        public required string District { get; set; }

        [BsonElement("Direction")]
        public string? Direction { get; set; } // Computed property

        [BsonElement("Password")]
        public required string Password { get; set; }

        [BsonElement("State")]
        public required string State { get; set; } // "Disponible" or "No disponible"

    }
}
