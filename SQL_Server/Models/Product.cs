using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Code")]
        public string Code { get; set; } // Original PK

        [BsonElement("Name")]
        public required string Name { get; set; }

        [BsonElement("Price")]
        public required decimal Price { get; set; }

        [BsonElement("Category")]
        public required string Category { get; set; }

        [BsonElement("BusinessAssociate_Legal_Id")]
        public required string BusinessAssociate_Legal_Id { get; set; }

    }
}
