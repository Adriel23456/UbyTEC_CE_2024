namespace SQL_Server.DTOs
{
    public class ProofOfPaymentDTO
    {
        public int? Code { get; set; } // PK
        public required string CreditCardName { get; set; }
        public required int LastDigitsCreditCard { get; set; }
        public int? TotalPayment { get; set; }
        public required string Date { get; set; } // Format "dd-mm-yyyy"
        public required string Time { get; set; } // Format "mm:hh"
        public string? ClientFullName { get; set; }
        public int? ClientPhone { get; set; }
        public required int Order_Code { get; set; } // FK
    }
}