namespace SQL_Server.DTOs
{
    public class SalesReportByAffiliateDTO
    {
        public string? Affiliate { get; set; }
        public long? Purchases { get; set; }
        public long? TotalAmount { get; set; }
        public long? ServiceAmount { get; set; }
    }
}