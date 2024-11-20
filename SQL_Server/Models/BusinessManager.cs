using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class BusinessManager
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Email")]
        public required string Email { get; set; } // Original PK

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

        [BsonElement("UserId")]
        public required string UserId { get; set; } // Unique

        [BsonElement("Password")]
        public required string Password { get; set; }
    }
}
