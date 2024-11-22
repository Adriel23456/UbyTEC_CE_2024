using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class BusinessAssociate
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Legal_Id")]
        public required string Legal_Id { get; set; }

        [BsonElement("Email")]
        public required string Email { get; set; }

        [BsonElement("State")]
        public required string State { get; set; }

        [BsonElement("BusinessName")]
        public required string BusinessName { get; set; }

        [BsonElement("Direction")]
        public string? Direction { get;  set; } // Computed property

        [BsonElement("Province")]
        public required string Province { get; set; }

        [BsonElement("Canton")]
        public required string Canton { get; set; }

        [BsonElement("District")]
        public required string District { get; set; }

        [BsonElement("SINPE")]
        public required long SINPE { get; set; }

        [BsonElement("RejectReason")]
        public string? RejectReason { get; set; }

        [BsonElement("BusinessManager_Email")]
        public required string BusinessManager_Email { get; set; }

        [BsonElement("BusinessType_Identification")]
        public required long BusinessType_Identification { get; set; }
    }
}
