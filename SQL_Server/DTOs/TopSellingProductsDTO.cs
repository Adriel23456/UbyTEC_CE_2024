namespace SQL_Server.DTOs
{
    public class TopSellingProductsDTO
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        public int? TotalSold { get; set; }
        public int? TotalRevenue { get; set; }
    }
}