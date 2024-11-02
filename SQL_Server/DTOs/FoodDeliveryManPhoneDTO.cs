namespace SQL_Server.DTOs
{
    public class FoodDeliveryManPhoneDTO
    {
        public required string FoodDeliveryMan_UserId { get; set; } // PK, FK
        public required int Phone { get; set; } // PK
    }
}