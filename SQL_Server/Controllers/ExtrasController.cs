using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtrasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ExtrasController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Extras/GetAdminsByFilter?filter={filter}
        [HttpGet("GetAdminsByFilter")]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdminsByFilter([FromQuery] string filter)
        {
            var admins = await _context.Admin
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetAdminsByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<AdminDTO>>(admins);
        }

        // GET: api/Extras/GetBusinessAssociatesByFilter?filter={filter}
        [HttpGet("GetBusinessAssociatesByFilter")]
        public async Task<ActionResult<IEnumerable<BusinessAssociateDTO>>> GetBusinessAssociatesByFilter([FromQuery] string filter)
        {
            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetBusinessAssociatesByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<BusinessAssociateDTO>>(businessAssociates);
        }

        // GET: api/Extras/GetBusinessManagersByFilter?filter={filter}
        [HttpGet("GetBusinessManagersByFilter")]
        public async Task<ActionResult<IEnumerable<BusinessManagerDTO>>> GetBusinessManagersByFilter([FromQuery] string filter)
        {
            var businessManagers = await _context.BusinessManager
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetBusinessManagersByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<BusinessManagerDTO>>(businessManagers);
        }
        
        // GET: api/Extras/GetAcceptedBusinessAssociatesByFilter?filter={filter}
        [HttpGet("GetAcceptedBusinessAssociatesByFilter")]
        public async Task<ActionResult<IEnumerable<BusinessAssociateDTO>>> GetAcceptedBusinessAssociatesByFilter([FromQuery] string filter)
        {
            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetAcceptedBusinessAssociatesByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<BusinessAssociateDTO>>(businessAssociates);
        }

        // GET: api/Extras/GetClientsByFilter?filter={filter}
        [HttpGet("GetClientsByFilter")]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClientsByFilter([FromQuery] string filter)
        {
            var clients = await _context.Client
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetClientsByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<ClientDTO>>(clients);
        }

        // GET: api/Extras/GetFoodDeliveryMenByFilter?filter={filter}
        [HttpGet("GetFoodDeliveryMenByFilter")]
        public async Task<ActionResult<IEnumerable<FoodDeliveryManDTO>>> GetFoodDeliveryMenByFilter([FromQuery] string filter)
        {
            var deliveryMen = await _context.FoodDeliveryMan
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetFoodDeliveryMenByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<FoodDeliveryManDTO>>(deliveryMen);
        }

        // GET: api/Extras/GetBusinessTypesByFilter?filter={filter}
        [HttpGet("GetBusinessTypesByFilter")]
        public async Task<ActionResult<IEnumerable<BusinessTypeDTO>>> GetBusinessTypesByFilter([FromQuery] string filter)
        {
            var businessTypes = await _context.BusinessType
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetBusinessTypesByFilter({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<BusinessTypeDTO>>(businessTypes);
        }

        // GET: api/Extras/GetOrdersByClientNameAndBusinessAndState?businessId={businessId}&filter={filter}
        [HttpGet("GetOrdersByClientNameAndBusinessAndState")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByClientNameAndBusinessAndState([FromQuery] long businessId, [FromQuery] string filter)
        {
            var orders = await _context.Order
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetOrdersByClientNameBusinessAndState({0}, {1})", businessId, filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<OrderDTO>>(orders);
        }

        // GET: api/Extras/GetOrdersByClientNameBusinessAndStateFilter?businessId={businessId}&clientFilter={clientFilter}&stateFilter={stateFilter}
        [HttpGet("GetOrdersByClientNameBusinessAndStateFilter")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByClientNameBusinessAndStateFilter([FromQuery] long businessId, [FromQuery] string clientFilter, [FromQuery] string stateFilter)
        {
            var orders = await _context.Order
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetOrdersByClientNameBusinessAndStateFilter({0}, {1}, {2})", businessId, clientFilter ?? (object)DBNull.Value, stateFilter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<OrderDTO>>(orders);
        }

        // GET: api/Extras/GetProductsByNameAndBusiness?businessId={businessId}&filter={filter}
        [HttpGet("GetProductsByNameAndBusiness")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProductsByNameAndBusiness([FromQuery] long businessId, [FromQuery] string filter)
        {
            var products = await _context.Product
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetProductsByNameAndBusiness({0}, {1})", businessId, filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<ProductDTO>>(products);
        }

        // GET: api/Extras/GetCartsByBusinessName?filter={filter}
        [HttpGet("GetCartsByBusinessName")]
        public async Task<ActionResult<IEnumerable<CartDTO>>> GetCartsByBusinessName([FromQuery] string filter)
        {
            var carts = await _context.Cart
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetCartsByBusinessName({0})", filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<CartDTO>>(carts);
        }

        // GET: api/Extras/GetProductsByCartAndFilter?cartCode={cartCode}&filter={filter}
        [HttpGet("GetProductsByCartAndFilter")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProductsByCartAndFilter([FromQuery] long cartCode, [FromQuery] string filter)
        {
            var products = await _context.Product
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetProductsByCartAndFilter({0}, {1})", cartCode, filter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<ProductDTO>>(products);
        }

        // GET: api/Extras/GetLast10OrdersByClient?clientId={clientId}
        [HttpGet("GetLast10OrdersByClient")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetLast10OrdersByClient([FromQuery] long clientId)
        {
            var orders = await _context.Order
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetLast10OrdersByClient({0})", clientId)
                .ToListAsync();

            return _mapper.Map<List<OrderDTO>>(orders);
        }

        // GET: api/Extras/GetOrdersByDateFilter?dateFilter={dateFilter}
        [HttpGet("GetOrdersByDateFilter")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByDateFilter([FromQuery] string dateFilter)
        {
            var orders = await _context.Order
                .FromSqlRaw("SELECT * FROM dbo.ufn_GetOrdersByDateFilter({0})", dateFilter ?? (object)DBNull.Value)
                .ToListAsync();

            return _mapper.Map<List<OrderDTO>>(orders);
        }
    }
}