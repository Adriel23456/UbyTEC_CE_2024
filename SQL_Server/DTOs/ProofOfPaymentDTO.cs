namespace SQL_Server.DTOs
{
    public class ProofOfPaymentDTO
    {
        public long? Code { get; set; } // PK
        public required string CreditCardName { get; set; }
        public required long LastDigitsCreditCard { get; set; }
        public long? TotalPayment { get; set; }
        public required string Date { get; set; } // Format "dd-mm-yyyy"
        public required string Time { get; set; } // Format "mm:hh"
        public string? ClientFullName { get; set; }
        public long? ClientPhone { get; set; }
        public required long Order_Code { get; set; } // FK
    }
}