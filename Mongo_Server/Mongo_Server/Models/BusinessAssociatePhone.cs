using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class BusinessAssociatePhone
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("BusinessAssociate_Legal_Id")]
        public required string BusinessAssociate_Legal_Id { get; set; }

        [BsonElement("Phone")]
        public required long Phone { get; set; }
    }
}
