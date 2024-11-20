using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class BusinessType
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Identification")]
        public string? Identification { get; set; } // Original PK

        [BsonElement("Name")]
        public required string Name { get; set; } // Unique

    }
}
