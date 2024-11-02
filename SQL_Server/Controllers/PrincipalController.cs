using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrincipalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PrincipalController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Principal/GetConsolidatedSalesReport
        [HttpGet("GetConsolidatedSalesReport")]
        public async Task<ActionResult<IEnumerable<ConsolidatedSalesReportDTO>>> GetConsolidatedSalesReport()
        {
            var reportData = await _context.Set<ConsolidatedSalesReportView>()
                .ToListAsync();

            return _mapper.Map<List<ConsolidatedSalesReportDTO>>(reportData);
        }

        // GET: api/Principal/GetSalesReportByAffiliate
        [HttpGet("GetSalesReportByAffiliate")]
        public async Task<ActionResult<IEnumerable<SalesReportByAffiliateDTO>>> GetSalesReportByAffiliate()
        {
            var reportData = await _context.Set<SalesReportByAffiliateView>()
                .ToListAsync();

            return _mapper.Map<List<SalesReportByAffiliateDTO>>(reportData);
        }

        // GET: api/Principal/GetTopSellingProducts
        [HttpGet("GetTopSellingProducts")]
        public async Task<ActionResult<IEnumerable<TopSellingProductsDTO>>> GetTopSellingProducts()
        {
            var reportData = await _context.Set<TopSellingProductsView>()
                .ToListAsync();

            return _mapper.Map<List<TopSellingProductsDTO>>(reportData);
        }

        // POST: api/Principal/AssignOrderToDeliveryMan/{orderCode}
        [HttpPost("AssignOrderToDeliveryMan/{orderCode}")]
        public async Task<IActionResult> AssignOrderToDeliveryMan(int orderCode)
        {
            try
            {
                var orderParam = new Microsoft.Data.SqlClient.SqlParameter("@OrderCode", orderCode);
                await _context.Database.ExecuteSqlRawAsync("EXEC sp_AssignOrderToDeliveryMan @OrderCode", orderParam);

                return Ok("Order assigned to delivery man successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/Principal/ReceiveOrderByClient/{orderCode}
        [HttpPost("ReceiveOrderByClient/{orderCode}")]
        public async Task<IActionResult> ReceiveOrderByClient(int orderCode)
        {
            try
            {
                var orderParam = new Microsoft.Data.SqlClient.SqlParameter("@OrderCode", orderCode);
                await _context.Database.ExecuteSqlRawAsync("EXEC sp_ReceiveOrderByClient @OrderCode", orderParam);

                return Ok("Order marked as received successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/Extras/GetBusinessesByFilterAndClientLocation?clientId={clientId}&filter={filter}
        [HttpGet("GetBusinessesByFilterAndClientLocation")]
        public async Task<ActionResult<IEnumerable<BusinessAssociateDTO>>> GetBusinessesByFilterAndClientLocation([FromQuery] int clientId, [FromQuery] string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return BadRequest(new { message = "Filter parameter is required." });
            }

            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("EXEC sp_GetBusinessesByFilterAndClientLocation @Client_Id = {0}, @Filter = {1}", clientId, filter)
                .ToListAsync();

            return _mapper.Map<List<BusinessAssociateDTO>>(businessAssociates);
        }
    }
}