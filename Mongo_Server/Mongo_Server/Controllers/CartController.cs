using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _mongoDbService;

        public CartController(CartService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetAllCarts()
        {
            var carts = await _mongoDbService.GetAllCartsAsync();

            if (carts == null || !carts.Any())
            {
                return NotFound(new { message = "No carts found in the MongoDB database." });
            }

            return Ok(carts);
        }

        // GET: api/Cart/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCartById(long id)
        {
            string idAsString = id.ToString();
            var cart = await _mongoDbService.GetCartByIdAsync(idAsString);
            if (cart == null)
            {
                return NotFound(new { message = $"Cart with Code {idAsString} not found." });
            }

            return Ok(cart);
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<CartDTO>> PostCart(CartDTO cartDto)
        {
            string idAsString = cartDto.Code.ToString();

            var originalBson = await _mongoDbService.GetCartByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Cart with Code '{idAsString}' already exists." });
            }

            var newCart = new Cart
            {
                Code = cartDto.Code.ToString(),
                BusinessAssociate_Legal_Id = cartDto.BusinessAssociate_Legal_Id?.ToString(),
                TotalProductsPrice = cartDto.TotalProductsPrice,
                Client_Id = cartDto.Client_Id.ToString()
            };

            await _mongoDbService.AddCartAsync(newCart);

            return CreatedAtAction(nameof(GetCartById), new { id = cartDto.Code }, cartDto);
        }

        // PUT: api/Cart/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(long id, CartDTO cartDtoUpdate)
        {
            string idAsString = id.ToString();

            var originalBson = await _mongoDbService.GetCartByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Cart with Code '{idAsString}' not found." });
            }

            originalBson.BusinessAssociate_Legal_Id = cartDtoUpdate.BusinessAssociate_Legal_Id?.ToString();
            originalBson.TotalProductsPrice = cartDtoUpdate.TotalProductsPrice;
            originalBson.Client_Id = cartDtoUpdate.Client_Id.ToString();

            await _mongoDbService.UpdateCartAsync(idAsString, originalBson);

            return NoContent();
        }

        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(long id)
        {
            string idAsString = id.ToString();

            var originalBson = await _mongoDbService.GetCartByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Cart with Code '{idAsString}' not found." });
            }

            await _mongoDbService.DeleteCartAsync(idAsString);

            return NoContent();
        }
    }
}
