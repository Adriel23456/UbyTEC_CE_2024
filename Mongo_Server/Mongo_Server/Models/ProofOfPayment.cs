using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Mongo_Server.Models
{
    public class ProofOfPayment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id_Mongo { get; set; } // MongoDB auto-generated ID

        [BsonElement("Code")]
        public string? Code { get; set; } // Original PK

        [BsonElement("CreditCardName")]
        public required string CreditCardName { get; set; }

        [BsonElement("LastDigitsCreditCard")]
        public required long LastDigitsCreditCard { get; set; }

        [BsonElement("TotalPayment")]
        public decimal? TotalPayment { get; set; } // Assigned automatically

        [BsonElement("Date")]
        public required string Date { get; set; } // Format "dd-mm-yyyy"

        [BsonElement("Time")]
        public required string Time { get; set; } // Format "mm:hh"

        [BsonElement("ClientFullName")]
        public string? ClientFullName { get; set; }

        [BsonElement("ClientPhone")]
        public long? ClientPhone { get; set; }

        [BsonElement("Order_Code")]
        public required string Order_Code { get; set; }
    }
}
