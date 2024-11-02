namespace SQL_Server.DTOs
{
    public class CartDTO
    {
        public int Code { get; set; } // PK
        public int? BusinessAssociate_Legal_Id { get; set; }
        public int? TotalProductsPrice { get; set; }
        public required int Client_Id { get; set; } // FK
    }
}