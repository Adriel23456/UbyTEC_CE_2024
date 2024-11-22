using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Code")]
        public string Code { get; set; } // Original PK

        [BsonElement("BusinessAssociate_Legal_Id")]
        public string? BusinessAssociate_Legal_Id { get; set; }

        [BsonElement("TotalProductsPrice")]
        public decimal? TotalProductsPrice { get; set; }

        [BsonElement("Client_Id")]
        public required string Client_Id { get; set; }

    }
}
