namespace SQL_Server.DTOs
{
    public class OrderDTO_Update
    {
        public required string State { get; set; }
        public required long Client_Id { get; set; } // FK
        public string? FoodDeliveryMan_UserId { get; set; } // FK
    }
}