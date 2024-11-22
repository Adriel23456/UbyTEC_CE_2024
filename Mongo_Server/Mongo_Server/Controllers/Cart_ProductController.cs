using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Cart_ProductController : ControllerBase
    {
        private readonly Cart_ProductService _mongoDbService;

        public Cart_ProductController(Cart_ProductService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Cart_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_Product>>> GetAllCartProducts()
        {
            var cartProducts = await _mongoDbService.GetAllCart_ProductsAsync();

            if (cartProducts == null || !cartProducts.Any())
            {
                return NotFound(new { message = "No cart products found in the MongoDB database." });
            }

            return Ok(cartProducts);
        }

        // GET: api/Cart_Product/{cartCode}
        [HttpGet("{cartCode}")]
        public async Task<ActionResult<Cart_Product>> GetCartProduct(long cartCode)
        {
            string cartCodeAsString = cartCode.ToString(); // Convert the Cart_Code to string
            var cartProduct = await _mongoDbService.GetCart_ProductByIdAsync(cartCodeAsString); // Use Id in the function name
            if (cartProduct == null)
            {
                return NotFound(new { message = $"Cart product with Cart_Code {cartCodeAsString}  not found." });
            }

            return Ok(cartProduct);
        }

        // POST: api/Cart_Product
        [HttpPost]
        public async Task<ActionResult<Cart_ProductDTO>> PostCartProduct(Cart_ProductDTO cartProductDto)
        {
            string cartCodeAsString = cartProductDto.Cart_Code.ToString(); // Convert the Cart_Code to string

            var originalBson = await _mongoDbService.GetCart_ProductByIdAsync(cartCodeAsString); // Use Id in the function name
            if (originalBson != null)
            {
                return Conflict(new { message = $"Cart product with Cart_Code '{cartCodeAsString}' already exists." });
            }

            var newCartProduct = new Cart_Product
            {
                Cart_Code = cartCodeAsString,
                Product_Code = cartProductDto.Product_Code,
                Amount = cartProductDto.Amount
            };

            await _mongoDbService.AddCart_ProductAsync(newCartProduct);

            return CreatedAtAction(nameof(GetCartProduct), new { cartCode = cartProductDto.Cart_Code}, cartProductDto);
        }

        // PUT: api/Cart_Product/{cartCode}
        [HttpPut("{cartCode}")]
        public async Task<IActionResult> PutCartProduct(long cartCode, Cart_ProductDTO cartProductDtoUpdate)
        {
            string cartCodeAsString = cartCode.ToString(); // Convert the Cart_Code to string

            var originalBson = await _mongoDbService.GetCart_ProductByIdAsync(cartCodeAsString); // Use Id in the function name
            if (originalBson == null)
            {
                return NotFound(new { message = $"Cart product with Cart_Code '{cartCodeAsString}' not found." });
            }

            originalBson.Amount = cartProductDtoUpdate.Amount;

            await _mongoDbService.UpdateCart_ProductAsync(cartCode, originalBson); // Use Id in the function name

            return NoContent();
        }

        // DELETE: api/Cart_Product/{cartCode}/{productCode}
        [HttpDelete("{cartCode}")]
        public async Task<IActionResult> DeleteCartProduct(long cartCode)
        {
            string cartCodeAsString = cartCode.ToString(); // Convert the Cart_Code to string

            var originalBson = await _mongoDbService.GetCart_ProductByIdAsync(cartCodeAsString); // Use Id in the function name
            if (originalBson == null)
            {
                return NotFound(new { message = $"Cart product with Cart_Code '{cartCodeAsString}' not found." });
            }

            await _mongoDbService.DeleteCart_ProductAsync(cartCode); // Use Id in the function name

            return NoContent();
        }
    }
}
