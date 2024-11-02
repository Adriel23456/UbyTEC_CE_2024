namespace SQL_Server.DTOs
{
    public class OrderDTO
    {
        public int Code { get; set; } // PK
        public required string State { get; set; }
        public int? TotalService { get; set; }
        public string? Direction { get; set; }
        public required int Client_Id { get; set; } // FK
        public required string FoodDeliveryMan_UserId { get; set; } // FK
    }
}