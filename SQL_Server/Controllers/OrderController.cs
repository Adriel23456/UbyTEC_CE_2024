using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;
using Microsoft.Data.SqlClient;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrderController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
        {
            var orders = await _context.Order
                .FromSqlRaw("EXEC sp_GetAllOrders")
                .ToListAsync();

            return _mapper.Map<List<OrderDTO>>(orders);
        }

        // GET: api/Order/{code}
        [HttpGet("{code}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int code)
        {
            var orders = await _context.Order
                .FromSqlRaw("EXEC sp_GetOrderByCode @Code = {0}", code)
                .ToListAsync();

            var order = orders.FirstOrDefault();

            if (order == null)
            {
                return NotFound(new { message = $"Order with Code {code} not found." });
            }

            return _mapper.Map<OrderDTO>(order);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> PostOrder(OrderDTO_Create orderDtoCreate)
        {
            // Validate State
            var validStates = new[] { "Preparando", "Listo para envio", "En camino", "Finalizado", "Cancelado" };
            if (!validStates.Contains(orderDtoCreate.State))
            {
                return BadRequest(new { message = $"Invalid State '{orderDtoCreate.State}'. Valid states are: {string.Join(", ", validStates)}." });
            }

            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == orderDtoCreate.Client_Id);
            if (!clientExists)
            {
                return BadRequest(new { message = $"Client with Id {orderDtoCreate.Client_Id} does not exist." });
            }

            // Check if FoodDeliveryMan exists
            var fdmExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == orderDtoCreate.FoodDeliveryMan_UserId);
            if (!fdmExists)
            {
                return BadRequest(new { message = $"FoodDeliveryMan with UserId '{orderDtoCreate.FoodDeliveryMan_UserId}' does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@State", orderDtoCreate.State),
                new SqlParameter("@Client_Id", orderDtoCreate.Client_Id),
                new SqlParameter("@FoodDeliveryMan_UserId", orderDtoCreate.FoodDeliveryMan_UserId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateOrder @State, @Client_Id, @FoodDeliveryMan_UserId", parameters);

            // Retrieve the newly created Order
            var orders = await _context.Order
                .FromSqlRaw("SELECT TOP 1 * FROM [Order] WHERE [Client_Id] = {0} ORDER BY [Code] DESC", orderDtoCreate.Client_Id)
                .ToListAsync();

            var order = orders.FirstOrDefault();

            var createdOrderDto = _mapper.Map<OrderDTO>(order);

            return CreatedAtAction(nameof(GetOrder), new { code = order?.Code }, createdOrderDto);
        }

        // PUT: api/Order/{code}
        [HttpPut("{code}")]
        public async Task<IActionResult> PutOrder(int code, OrderDTO_Update orderDtoUpdate)
        {
            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == code);
            if (!orderExists)
            {
                return NotFound(new { message = $"Order with Code {code} not found." });
            }

            // Validate State
            var validStates = new[] { "Preparando", "Listo para envio", "En camino", "Finalizado", "Cancelado" };
            if (!validStates.Contains(orderDtoUpdate.State))
            {
                return BadRequest(new { message = $"Invalid State '{orderDtoUpdate.State}'. Valid states are: {string.Join(", ", validStates)}." });
            }

            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == orderDtoUpdate.Client_Id);
            if (!clientExists)
            {
                return BadRequest(new { message = $"Client with Id {orderDtoUpdate.Client_Id} does not exist." });
            }

            // Check if FoodDeliveryMan exists
            var fdmExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == orderDtoUpdate.FoodDeliveryMan_UserId);
            if (!fdmExists)
            {
                return BadRequest(new { message = $"FoodDeliveryMan with UserId '{orderDtoUpdate.FoodDeliveryMan_UserId}' does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Code", code),
                new SqlParameter("@State", orderDtoUpdate.State),
                new SqlParameter("@Client_Id", orderDtoUpdate.Client_Id),
                new SqlParameter("@FoodDeliveryMan_UserId", orderDtoUpdate.FoodDeliveryMan_UserId)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateOrder @Code, @State, @Client_Id, @FoodDeliveryMan_UserId", parameters);

            return NoContent();
        }

        // DELETE: api/Order/{code}
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteOrder(int code)
        {
            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == code);
            if (!orderExists)
            {
                return NotFound(new { message = $"Order with Code {code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteOrder @Code = {0}", code);

            return NoContent();
        }
    }
}