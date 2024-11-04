namespace SQL_Server.DTOs
{
    public class TopSellingProductsDTO
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        public long? TotalSold { get; set; }
        public long? TotalRevenue { get; set; }
    }
}