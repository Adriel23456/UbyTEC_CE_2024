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
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CartController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartDTO>>> GetCarts()
        {
            var carts = await _context.Cart
                .FromSqlRaw("EXEC sp_GetAllCarts")
                .ToListAsync();

            return _mapper.Map<List<CartDTO>>(carts);
        }

        // GET: api/Cart/{code}
        [HttpGet("{code}")]
        public async Task<ActionResult<CartDTO>> GetCart(long code)
        {
            var carts = await _context.Cart
                .FromSqlRaw("EXEC sp_GetCartByCode @Code = {0}", code)
                .ToListAsync();

            var cart = carts.FirstOrDefault();

            if (cart == null)
            {
                return NotFound(new { message = $"Cart with Code {code} not found." });
            }

            return _mapper.Map<CartDTO>(cart);
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<CartDTO>> PostCart(CartDTO_Create cartDtoCreate)
        {
            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == cartDtoCreate.Client_Id);
            if (!clientExists)
            {
                return BadRequest(new { message = $"Client with Id {cartDtoCreate.Client_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Client_Id", cartDtoCreate.Client_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateCart @Client_Id", parameters);

            // Retrieve the newly created Cart
            var carts = await _context.Cart
                .FromSqlRaw("SELECT TOP 1 * FROM [Cart] WHERE [Client_Id] = {0} ORDER BY [Code] DESC", cartDtoCreate.Client_Id)
                .ToListAsync();

            var cart = carts.FirstOrDefault();

            var createdCartDto = _mapper.Map<CartDTO>(cart);

            return CreatedAtAction(nameof(GetCart), new { code = cart?.Code }, createdCartDto);
        }

        // PUT: api/Cart/{code}
        [HttpPut("{code}")]
        public async Task<IActionResult> PutCart(long code, CartDTO_Update cartDtoUpdate)
        {
            // Check if Cart exists
            var cartExists = await _context.Cart.AnyAsync(c => c.Code == code);
            if (!cartExists)
            {
                return NotFound(new { message = $"Cart with Code {code} not found." });
            }

            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == cartDtoUpdate.Client_Id);
            if (!clientExists)
            {
                return BadRequest(new { message = $"Client with Id {cartDtoUpdate.Client_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Code", code),
                new SqlParameter("@Client_Id", cartDtoUpdate.Client_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateCart @Code, @Client_Id", parameters);

            return NoContent();
        }

        // DELETE: api/Cart/{code}
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteCart(long code)
        {
            // Check if Cart exists
            var cartExists = await _context.Cart.AnyAsync(c => c.Code == code);
            if (!cartExists)
            {
                return NotFound(new { message = $"Cart with Code {code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteCart @Code = {0}", code);

            return NoContent();
        }
    }
}