using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SQL_Server.Models
{
    public class Order_Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Order_Code")]
        public required string Order_Code { get; set; } // Original PK

        [BsonElement("Product_Code")]
        public required string Product_Code { get; set; } // Original PK

        [BsonElement("Amount")]
        public string Amount { get; set; } // Starts at 1
    }
}
