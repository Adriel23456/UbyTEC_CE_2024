namespace SQL_Server.Models
{
    public class SalesReportByAffiliateView
    {
        public string? Affiliate { get; set; }
        public long? Purchases { get; set; }
        public long? TotalAmount { get; set; }
        public long? ServiceAmount { get; set; }
    }
}