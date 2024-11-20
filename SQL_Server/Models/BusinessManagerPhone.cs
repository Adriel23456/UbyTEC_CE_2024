using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class BusinessManagerPhone
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("BusinessManager_Email")]
        public required string BusinessManager_Email { get; set; } // Original PK

        [BsonElement("Phone")]
        public required long Phone { get; set; } // Original PK
    }
}
