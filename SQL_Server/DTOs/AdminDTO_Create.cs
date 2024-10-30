namespace SQL_Server.DTOs
{
    public class AdminDTO_Create
    {
        public required int Id { get; set; } // Número de cédula del admin
        public required string Name { get; set; }
        public required string FirstSurname { get; set; }
        public required string SecondSurname { get; set; }
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required string UserId { get; set; }
        public required string Password { get; set; }
    }
}