using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.Models
{
    public class SalesReportByAffiliateView
    {
        public string? Affiliate { get; set; }
        public long? Purchases { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalAmount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ServiceAmount { get; set; }
    }
}