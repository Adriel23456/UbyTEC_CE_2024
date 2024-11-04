namespace SQL_Server.DTOs
{
    public class ClientDTO_Create
    {
        public required long Id { get; set; } // PK
        public required string UserId { get; set; } // Unique
        public required string Name { get; set; }
        public required string FirstSurname { get; set; }
        public required string SecondSurname { get; set; }
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required string Password { get; set; }
        public required long Phone { get; set; }
        public required string BirthDate { get; set; } // Format "dd-mm-yyyy"
    }
}