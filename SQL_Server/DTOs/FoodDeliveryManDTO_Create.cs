namespace SQL_Server.DTOs
{
    public class FoodDeliveryManDTO_Create
    {
        public required string UserId { get; set; } // PK
        public required string Name { get; set; }
        public required string FirstSurname { get; set; }
        public required string SecondSurname { get; set; }
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required string Password { get; set; }
        public required string State { get; set; } // "Disponible" or "No disponible"
    }
}