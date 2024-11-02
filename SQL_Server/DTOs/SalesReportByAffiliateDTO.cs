namespace SQL_Server.DTOs
{
    public class SalesReportByAffiliateDTO
    {
        public string? Affiliate { get; set; }
        public int? Purchases { get; set; }
        public int? TotalAmount { get; set; }
        public int? ServiceAmount { get; set; }
    }
}