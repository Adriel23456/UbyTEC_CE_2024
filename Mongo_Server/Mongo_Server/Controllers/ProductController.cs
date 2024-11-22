using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.Models;
using Mongo_Server.ServicesMongo;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _mongoDbService;

        public ProductController(ProductService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _mongoDbService.GetAllProductsAsync();

            if (products == null || !products.Any())
            {
                return NotFound(new { message = "No products found in the MongoDB database." });
            }

            return Ok(products);
        }

        // GET: api/Product/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _mongoDbService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { message = $"Product with Code '{id}' not found." });
            }

            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> PostProduct(ProductDTO productDto)
        {
            string codeAsString = productDto.Code?.ToString();
            string businessAssociateIdAsString = productDto.BusinessAssociate_Legal_Id.ToString();

            var existingProduct = await _mongoDbService.GetProductByIdAsync(codeAsString);
            if (existingProduct != null)
            {
                return Conflict(new { message = $"Product with Code '{codeAsString}' already exists." });
            }

            var newProduct = new Product
            {
                Code = codeAsString,
                Name = productDto.Name,
                Price = productDto.Price, 
                Category = productDto.Category,
                BusinessAssociate_Legal_Id = businessAssociateIdAsString
            };

            await _mongoDbService.AddProductAsync(newProduct);

            return CreatedAtAction(nameof(GetProductById), new { id = productDto.Code }, productDto);
        }

        // PUT: api/Product/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(string id, ProductDTO productDtoUpdate)
        {
            var existingProduct = await _mongoDbService.GetProductByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound(new { message = $"Product with Code '{id}' not found." });
            }

            existingProduct.Name = productDtoUpdate.Name;
            existingProduct.Price = productDtoUpdate.Price; // Decimal remains as is
            existingProduct.Category = productDtoUpdate.Category;
            existingProduct.BusinessAssociate_Legal_Id = productDtoUpdate.BusinessAssociate_Legal_Id.ToString();

            await _mongoDbService.UpdateProductAsync(id, existingProduct);

            return NoContent();
        }

        // DELETE: api/Product/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var existingProduct = await _mongoDbService.GetProductByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound(new { message = $"Product with Code '{id}' not found." });
            }

            await _mongoDbService.DeleteProductAsync(id);

            return NoContent();
        }
    }
}
