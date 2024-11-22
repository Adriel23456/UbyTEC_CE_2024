using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class AdminPhone
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Admin_Id")]
        public required string Admin_id { get; set; }

        [BsonElement("Phone")]
        public required long Phone { get; set; }
    }
}
