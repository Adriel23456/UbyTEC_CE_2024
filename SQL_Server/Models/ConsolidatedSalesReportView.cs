namespace SQL_Server.Models
{
    public class ConsolidatedSalesReportView
    {
        public int? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? Affiliate { get; set; }
        public int? Purchases { get; set; }
        public string? Conductor { get; set; }
        public int? TotalAmount { get; set; }
        public int? ServiceAmount { get; set; }
    }
}