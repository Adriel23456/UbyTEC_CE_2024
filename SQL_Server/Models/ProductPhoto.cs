using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class ProductPhoto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Product_Code")]
        public required string Product_Code { get; set; } // Original PK

        [BsonElement("PhotoURL")]
        public required string PhotoURL { get; set; } // Original PK
    }
}
