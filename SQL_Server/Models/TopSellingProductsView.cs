namespace SQL_Server.Models
{
    public class TopSellingProductsView
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        public long? TotalSold { get; set; }
        public long? TotalRevenue { get; set; }
    }
}