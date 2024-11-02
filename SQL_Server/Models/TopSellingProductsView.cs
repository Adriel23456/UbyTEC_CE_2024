namespace SQL_Server.Models
{
    public class TopSellingProductsView
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        public int? TotalSold { get; set; }
        public int? TotalRevenue { get; set; }
    }
}