using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.DTOs
{
    public class TopSellingProductsDTO
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        public long? TotalSold { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalRevenue { get; set; }
    }
}