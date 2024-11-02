namespace SQL_Server.DTOs
{
    public class ProofOfPaymentDTO_Create
    {
        public required string CreditCardName { get; set; }
        public required int LastDigitsCreditCard { get; set; }
        public required string Date { get; set; } // Format "dd-mm-yyyy"
        public required string Time { get; set; } // Format "mm:hh"
        public required int Order_Code { get; set; } // FK
    }
}