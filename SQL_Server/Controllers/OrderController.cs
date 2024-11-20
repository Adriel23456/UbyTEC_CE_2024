using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.Models;
using SQL_Server.ServicesMongo;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _mongoDbService;

        public OrderController(OrderService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _mongoDbService.GetAllOrdersAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound(new { message = "No orders found in the MongoDB database." });
            }

            return Ok(orders);
        }

        // GET: api/Order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(string id)
        {
            var order = await _mongoDbService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound(new { message = $"Order with Code '{id}' not found." });
            }

            return Ok(order);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> PostOrder(OrderDTO orderDto)
        {
            string codeAsString = orderDto.Code.ToString();
            string clientIdAsString = orderDto.Client_Id.ToString();

            var existingOrder = await _mongoDbService.GetOrderByIdAsync(codeAsString);
            if (existingOrder != null)
            {
                return Conflict(new { message = $"Order with Code '{codeAsString}' already exists." });
            }

            var newOrder = new Order
            {
                Code = codeAsString,
                State = orderDto.State,
                TotalService = orderDto.TotalService, // Decimal remains as is
                Direction = orderDto.Direction,
                Client_Id = clientIdAsString,
                FoodDeliveryMan_UserId = orderDto.FoodDeliveryMan_UserId
            };

            await _mongoDbService.AddOrderAsync(newOrder);

            return CreatedAtAction(nameof(GetOrderById), new { id = orderDto.Code }, orderDto);
        }

        // PUT: api/Order/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(string id, OrderDTO orderDtoUpdate)
        {
            var existingOrder = await _mongoDbService.GetOrderByIdAsync(id);
            if (existingOrder == null)
            {
                return NotFound(new { message = $"Order with Code '{id}' not found." });
            }

            existingOrder.State = orderDtoUpdate.State;
            existingOrder.TotalService = orderDtoUpdate.TotalService; // Decimal remains as is
            existingOrder.Direction = orderDtoUpdate.Direction;
            existingOrder.Client_Id = orderDtoUpdate.Client_Id.ToString();
            existingOrder.FoodDeliveryMan_UserId = orderDtoUpdate.FoodDeliveryMan_UserId;

            await _mongoDbService.UpdateOrderAsync(id, existingOrder);

            return NoContent();
        }

        // DELETE: api/Order/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var existingOrder = await _mongoDbService.GetOrderByIdAsync(id);
            if (existingOrder == null)
            {
                return NotFound(new { message = $"Order with Code '{id}' not found." });
            }

            await _mongoDbService.DeleteOrderAsync(id);

            return NoContent();
        }
    }
}
