namespace SQL_Server.DTOs
{
    public class BusinessAssociateDTO_Create
    {
        public required int Legal_Id { get; set; } // PK
        public required string Email { get; set; }
        public required string State { get; set; } // "Aceptado", "En espera", "Rechazado"
        public required string BusinessName { get; set; }
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required int SINPE { get; set; }
        public required string BusinessManager_Email { get; set; } // FK
        public required int BusinessType_Identification { get; set; } // FK
    }
}