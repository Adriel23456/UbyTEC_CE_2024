namespace SQL_Server.Models
{
    public class SalesReportByAffiliateView
    {
        public string? Affiliate { get; set; }
        public int? Purchases { get; set; }
        public int? TotalAmount { get; set; }
        public int? ServiceAmount { get; set; }
    }
}