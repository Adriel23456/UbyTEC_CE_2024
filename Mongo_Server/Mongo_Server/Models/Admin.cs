using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class Admin
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Id")]
        public required string Id { get; set; } // Número de cédula del admin

        [BsonElement("Name")]
        public required string Name { get; set; }

        [BsonElement("FirstSurname")]
        public required string FirstSurname { get; set; }

        [BsonElement("SecondSurname")]
        public required string SecondSurname { get; set; }

        [BsonElement("FullName")]
        public string? FullName { get; private set; } // Atributo compuesto set privado y puede ser nulo

        [BsonElement("Province")]
        public required string Province { get; set; }

        [BsonElement("Canton")]
        public required string Canton { get; set; }

        [BsonElement("District")]
        public required string District { get; set; }

        [BsonElement("Direction")]
        public string? Direction { get; private set; } // Atributo compuesto set privado y puede ser nulo

        [BsonElement("UserId")]
        public required string UserId { get; set; }

        [BsonElement("Password")]
        public required string Password { get; set; }

    }
}
