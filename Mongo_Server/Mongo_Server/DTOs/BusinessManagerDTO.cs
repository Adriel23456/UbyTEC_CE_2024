namespace Mongo_Server.DTOs
{
    public class BusinessManagerDTO
    {
        public required string Email { get; set; } // PK
        public required string Name { get; set; }
        public required string FirstSurname { get; set; }
        public required string SecondSurname { get; set; }
        public required string FullName { get; set; } // Computed property
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required string Direction { get; set; } // Computed property
        public required string UserId { get; set; } // UNIQUE
        public required string Password { get; set; }
    }
}