namespace SQL_Server.DTOs
{
    public class BusinessAssociateDTO_Update
    {
        public required string Email { get; set; }
        public required string State { get; set; } // "Aceptado", "En espera", "Rechazado"
        public required string BusinessName { get; set; }
        public required string Province { get; set; }
        public required string Canton { get; set; }
        public required string District { get; set; }
        public required long SINPE { get; set; }
        public string? RejectReason { get; set; }
        public required string BusinessManager_Email { get; set; } // FK
        public required long BusinessType_Identification { get; set; } // FK
    }
}