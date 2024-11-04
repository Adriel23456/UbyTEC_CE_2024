namespace SQL_Server.DTOs
{
    public class ConsolidatedSalesReportDTO
    {
        public long? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? Affiliate { get; set; }
        public long? Purchases { get; set; }
        public string? Conductor { get; set; }
        public long? TotalAmount { get; set; }
        public long? ServiceAmount { get; set; }
    }
}