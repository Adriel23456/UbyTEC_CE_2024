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
    public class Cart_ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public Cart_ProductController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Cart_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart_ProductDTO>>> GetCartProducts()
        {
            var cartProducts = await _context.Cart_Product
                .FromSqlRaw("EXEC sp_GetAllCartProducts")
                .ToListAsync();

            return _mapper.Map<List<Cart_ProductDTO>>(cartProducts);
        }

        // GET: api/Cart_Product/{cart_code}/Products
        [HttpGet("{cart_code}/Products")]
        public async Task<ActionResult<IEnumerable<Cart_ProductDTO>>> GetProductsByCartCode(int cart_code)
        {
            // Check if Cart exists
            var cartExists = await _context.Cart.AnyAsync(c => c.Code == cart_code);
            if (!cartExists)
            {
                return NotFound(new { message = $"Cart with Code {cart_code} not found." });
            }

            // Call Stored Procedure
            var cartProducts = await _context.Cart_Product
                .FromSqlRaw("EXEC sp_GetCartProductsByCartCode @Cart_Code = {0}", cart_code)
                .ToListAsync();

            var cartProductDtos = _mapper.Map<List<Cart_ProductDTO>>(cartProducts);

            return Ok(cartProductDtos);
        }

        // POST: api/Cart_Product
        [HttpPost]
        public async Task<ActionResult<Cart_ProductDTO>> PostCartProduct(Cart_ProductDTO_Create cartProductDtoCreate)
        {
            // Check if Cart exists
            var cartExists = await _context.Cart.AnyAsync(c => c.Code == cartProductDtoCreate.Cart_Code);
            if (!cartExists)
            {
                return BadRequest(new { message = $"Cart with Code {cartProductDtoCreate.Cart_Code} does not exist." });
            }

            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == cartProductDtoCreate.Product_Code);
            if (!productExists)
            {
                return BadRequest(new { message = $"Product with Code {cartProductDtoCreate.Product_Code} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Cart_Code", cartProductDtoCreate.Cart_Code),
                new SqlParameter("@Product_Code", cartProductDtoCreate.Product_Code)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateCartProduct @Cart_Code, @Product_Code", parameters);

            // Retrieve the Cart_Product
            var cartProducts = await _context.Cart_Product
                .FromSqlRaw("SELECT * FROM [Cart_Product] WHERE [Cart_Code] = {0} AND [Product_Code] = {1}", cartProductDtoCreate.Cart_Code, cartProductDtoCreate.Product_Code)
                .ToListAsync();

            var cartProduct = cartProducts.FirstOrDefault();

            var createdCartProductDto = _mapper.Map<Cart_ProductDTO>(cartProduct);

            return CreatedAtAction(nameof(GetProductsByCartCode), new { cart_code = cartProduct?.Cart_Code }, createdCartProductDto);
        }

        // PUT: api/Cart_Product/{cart_code}/{product_code}
        [HttpPut("{cart_code}/{product_code}")]
        public async Task<IActionResult> PutCartProduct(int cart_code, int product_code, Cart_ProductDTO_Update cartProductDtoUpdate)
        {
            // Check if Cart_Product exists
            var cartProductExists = await _context.Cart_Product.AnyAsync(cp => cp.Cart_Code == cart_code && cp.Product_Code == product_code);
            if (!cartProductExists)
            {
                return NotFound(new { message = $"Cart_Product with Cart_Code {cart_code} and Product_Code {product_code} not found." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Cart_Code", cart_code),
                new SqlParameter("@Product_Code", product_code),
                new SqlParameter("@Amount", cartProductDtoUpdate.Amount)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateCartProduct @Cart_Code, @Product_Code, @Amount", parameters);

            return NoContent();
        }

        // DELETE: api/Cart_Product/{cart_code}/{product_code}
        [HttpDelete("{cart_code}/{product_code}")]
        public async Task<IActionResult> DeleteCartProduct(int cart_code, int product_code)
        {
            // Check if Cart_Product exists
            var cartProductExists = await _context.Cart_Product.AnyAsync(cp => cp.Cart_Code == cart_code && cp.Product_Code == product_code);
            if (!cartProductExists)
            {
                return NotFound(new { message = $"Cart_Product with Cart_Code {cart_code} and Product_Code {product_code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteCartProduct @Cart_Code = {0}, @Product_Code = {1}", cart_code, product_code);

            return NoContent();
        }
    }
}