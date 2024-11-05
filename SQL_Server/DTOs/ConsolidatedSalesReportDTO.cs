using System.ComponentModel.DataAnnotations.Schema;

namespace SQL_Server.DTOs
{
    public class ConsolidatedSalesReportDTO
    {
        public long? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? Affiliate { get; set; }
        public long? Purchases { get; set; }
        public string? Conductor { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalAmount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? ServiceAmount { get; set; }
    }
}