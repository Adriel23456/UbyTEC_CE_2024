namespace SQL_Server.DTOs
{
    public class OrderDTO_Create
    {
        public required string State { get; set; }
        public required int Client_Id { get; set; } // FK
        public string? FoodDeliveryMan_UserId { get; set; } // FK
    }
}