using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Order_ProductController : ControllerBase
    {
        private readonly OrderProductService _mongoDbService;

        public Order_ProductController(OrderProductService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Order_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order_Product>>> GetAllOrder_Products()
        {
            var order_Products = await _mongoDbService.GetAllOrder_ProductAsync();

            if (order_Products == null || !order_Products.Any())
            {
                return NotFound(new { message = "No order products found in the MongoDB database." });
            }

            return Ok(order_Products);
        }

        // GET: api/Order_Product/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Order_Product>> GetOrder_ProductById(string id)
        {
            var order_Product = await _mongoDbService.GetOrder_ProductByIdAsync(id);
            if (order_Product == null)
            {
                return NotFound(new { message = $"Order product with Order_Code '{id}' not found." });
            }

            return Ok(order_Product);
        }

        // POST: api/Order_Product
        [HttpPost]
        public async Task<ActionResult<Order_ProductDTO>> PostOrder_Product(Order_ProductDTO order_ProductDto)
        {
            string orderCodeAsString = order_ProductDto.Order_Code.ToString();
            string productCodeAsString = order_ProductDto.Product_Code.ToString();
            string amountAsString = order_ProductDto.Amount.ToString();

            var existingOrder_Product = await _mongoDbService.GetOrder_ProductByIdAsync(orderCodeAsString);
            if (existingOrder_Product != null)
            {
                return Conflict(new { message = $"Order product with Order_Code '{orderCodeAsString}' already exists." });
            }

            var newOrder_Product = new Order_Product
            {
                Order_Code = orderCodeAsString,
                Product_Code = productCodeAsString,
                Amount = amountAsString
            };

            await _mongoDbService.AddOrder_ProductAsync(newOrder_Product);

            return CreatedAtAction(nameof(GetOrder_ProductById), new { id = order_ProductDto.Order_Code }, order_ProductDto);
        }

        // PUT: api/Order_Product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder_Product(string id, Order_ProductDTO order_ProductDtoUpdate)
        {
            var existingOrder_Product = await _mongoDbService.GetOrder_ProductByIdAsync(id);
            if (existingOrder_Product == null)
            {
                return NotFound(new { message = $"Order product with Order_Code '{id}' not found." });
            }

            existingOrder_Product.Product_Code = order_ProductDtoUpdate.Product_Code.ToString();
            existingOrder_Product.Amount = order_ProductDtoUpdate.Amount.ToString();

            await _mongoDbService.UpdateOrder_ProductAsync(id, existingOrder_Product);

            return NoContent();
        }

        // DELETE: api/Order_Product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder_Product(string id)
        {
            var existingOrder_Product = await _mongoDbService.GetOrder_ProductByIdAsync(id);
            if (existingOrder_Product == null)
            {
                return NotFound(new { message = $"Order product with Order_Code '{id}' not found." });
            }

            await _mongoDbService.DeleteOrder_ProductAsync(id);

            return NoContent();
        }
    }
}
