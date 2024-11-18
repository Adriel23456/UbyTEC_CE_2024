namespace SQL_Server.DTOs
{
    public class ProofOfPaymentDTO_Update
    {
        public required string CreditCardName { get; set; }
        public required long LastDigitsCreditCard { get; set; }
        public required string Date { get; set; } // Format "dd-mm-yyyy"
        public required string Time { get; set; } // Format "mm:hh"
        public required long Order_Code { get; set; } // FK
    }
}