namespace SQL_Server.DTOs
{
    public class CartDTO
    {
        public long Code { get; set; } // PK
        public long? BusinessAssociate_Legal_Id { get; set; }
        public long? TotalProductsPrice { get; set; }
        public required long Client_Id { get; set; } // FK
    }
}