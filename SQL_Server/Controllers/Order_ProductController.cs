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
    public class Order_ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public Order_ProductController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Order_Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order_ProductDTO>>> GetOrderProducts()
        {
            var orderProducts = await _context.Order_Product
                .FromSqlRaw("EXEC sp_GetAllOrderProducts")
                .ToListAsync();

            return _mapper.Map<List<Order_ProductDTO>>(orderProducts);
        }

        // GET: api/Order_Product/{order_code}/Products
        [HttpGet("{order_code}/Products")]
        public async Task<ActionResult<IEnumerable<Order_ProductDTO>>> GetProductsByOrderCode(long order_code)
        {
            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == order_code);
            if (!orderExists)
            {
                return NotFound(new { message = $"Order with Code {order_code} not found." });
            }

            // Call Stored Procedure
            var orderProducts = await _context.Order_Product
                .FromSqlRaw("EXEC sp_GetOrderProductsByOrderCode @Order_Code = {0}", order_code)
                .ToListAsync();

            var orderProductDtos = _mapper.Map<List<Order_ProductDTO>>(orderProducts);

            return Ok(orderProductDtos);
        }

        // POST: api/Order_Product
        [HttpPost]
        public async Task<ActionResult<Order_ProductDTO>> PostOrderProduct(Order_ProductDTO_Create orderProductDtoCreate)
        {
            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == orderProductDtoCreate.Order_Code);
            if (!orderExists)
            {
                return BadRequest(new { message = $"Order with Code {orderProductDtoCreate.Order_Code} does not exist." });
            }

            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == orderProductDtoCreate.Product_Code);
            if (!productExists)
            {
                return BadRequest(new { message = $"Product with Code {orderProductDtoCreate.Product_Code} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Order_Code", orderProductDtoCreate.Order_Code),
                new SqlParameter("@Product_Code", orderProductDtoCreate.Product_Code)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateOrderProduct @Order_Code, @Product_Code", parameters);

            // Retrieve the Order_Product
            var orderProducts = await _context.Order_Product
                .FromSqlRaw("SELECT * FROM [Order_Product] WHERE [Order_Code] = {0} AND [Product_Code] = {1}", orderProductDtoCreate.Order_Code, orderProductDtoCreate.Product_Code)
                .ToListAsync();

            var orderProduct = orderProducts.FirstOrDefault();

            var createdOrderProductDto = _mapper.Map<Order_ProductDTO>(orderProduct);

            return CreatedAtAction(nameof(GetProductsByOrderCode), new { order_code = orderProduct?.Order_Code }, createdOrderProductDto);
        }

        // PUT: api/Order_Product/{order_code}/{product_code}
        [HttpPut("{order_code}/{product_code}")]
        public async Task<IActionResult> PutOrderProduct(long order_code, long product_code, Order_ProductDTO_Update orderProductDtoUpdate)
        {
            // Check if Order_Product exists
            var orderProductExists = await _context.Order_Product.AnyAsync(op => op.Order_Code == order_code && op.Product_Code == product_code);
            if (!orderProductExists)
            {
                return NotFound(new { message = $"Order_Product with Order_Code {order_code} and Product_Code {product_code} not found." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Order_Code", order_code),
                new SqlParameter("@Product_Code", product_code),
                new SqlParameter("@Amount", orderProductDtoUpdate.Amount)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateOrderProduct @Order_Code, @Product_Code, @Amount", parameters);

            return NoContent();
        }

        // DELETE: api/Order_Product/{order_code}/{product_code}
        [HttpDelete("{order_code}/{product_code}")]
        public async Task<IActionResult> DeleteOrderProduct(long order_code, long product_code)
        {
            // Check if Order_Product exists
            var orderProductExists = await _context.Order_Product.AnyAsync(op => op.Order_Code == order_code && op.Product_Code == product_code);
            if (!orderProductExists)
            {
                return NotFound(new { message = $"Order_Product with Order_Code {order_code} and Product_Code {product_code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteOrderProduct @Order_Code = {0}, @Product_Code = {1}", order_code, product_code);

            return NoContent();
        }
    }
}