using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.Models
{
    public class TopSellingProductsView
    {
        public string? ProductName { get; set; }
        public string? Affiliate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalSold { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalRevenue { get; set; }
    }
}