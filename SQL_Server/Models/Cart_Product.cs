using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class Cart_Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Cart_Code")]
        public required string Cart_Code { get; set; } // Original PK

        [BsonElement("Product_Code")]
        public required long Product_Code { get; set; } // Original PK

        [BsonElement("Amount")]
        public long Amount { get; set; } // Starts at 1
    }
}
