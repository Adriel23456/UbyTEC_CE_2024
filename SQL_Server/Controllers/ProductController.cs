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
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            var products = await _context.Product
                .FromSqlRaw("EXEC sp_GetAllProducts")
                .ToListAsync();

            return _mapper.Map<List<ProductDTO>>(products);
        }

        // GET: api/Product/{code}
        [HttpGet("{code}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int code)
        {
            var products = await _context.Product
                .FromSqlRaw("EXEC sp_GetProductByCode @Code = {0}", code)
                .ToListAsync();

            var product = products.FirstOrDefault();

            if (product == null)
            {
                return NotFound(new { message = $"Product with Code {code} not found." });
            }

            return _mapper.Map<ProductDTO>(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> PostProduct(ProductDTO_Create productDtoCreate)
        {
            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == productDtoCreate.BusinessAssociate_Legal_Id);
            if (!businessAssociateExists)
            {
                return BadRequest(new { message = $"BusinessAssociate with Legal_Id {productDtoCreate.BusinessAssociate_Legal_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Name", productDtoCreate.Name),
                new SqlParameter("@Price", productDtoCreate.Price),
                new SqlParameter("@Category", productDtoCreate.Category),
                new SqlParameter("@BusinessAssociate_Legal_Id", productDtoCreate.BusinessAssociate_Legal_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateProduct @Name, @Price, @Category, @BusinessAssociate_Legal_Id", parameters);

            // Retrieve the newly created Product
            var products = await _context.Product
                .FromSqlRaw("SELECT TOP 1 * FROM [Product] WHERE [BusinessAssociate_Legal_Id] = {0} ORDER BY [Code] DESC", productDtoCreate.BusinessAssociate_Legal_Id)
                .ToListAsync();

            var product = products.FirstOrDefault();

            var createdProductDto = _mapper.Map<ProductDTO>(product);

            return CreatedAtAction(nameof(GetProduct), new { code = product?.Code }, createdProductDto);
        }

        // PUT: api/Product/{code}
        [HttpPut("{code}")]
        public async Task<IActionResult> PutProduct(int code, ProductDTO_Update productDtoUpdate)
        {
            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == code);
            if (!productExists)
            {
                return NotFound(new { message = $"Product with Code {code} not found." });
            }

            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == productDtoUpdate.BusinessAssociate_Legal_Id);
            if (!businessAssociateExists)
            {
                return BadRequest(new { message = $"BusinessAssociate with Legal_Id {productDtoUpdate.BusinessAssociate_Legal_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Code", code),
                new SqlParameter("@Name", productDtoUpdate.Name),
                new SqlParameter("@Price", productDtoUpdate.Price),
                new SqlParameter("@Category", productDtoUpdate.Category),
                new SqlParameter("@BusinessAssociate_Legal_Id", productDtoUpdate.BusinessAssociate_Legal_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateProduct @Code, @Name, @Price, @Category, @BusinessAssociate_Legal_Id", parameters);

            return NoContent();
        }

        // DELETE: api/Product/{code}
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteProduct(int code)
        {
            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == code);
            if (!productExists)
            {
                return NotFound(new { message = $"Product with Code {code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteProduct @Code = {0}", code);

            return NoContent();
        }
    }
}