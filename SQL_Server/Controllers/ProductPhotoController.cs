using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.Models;
using SQL_Server.ServicesMongo;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductPhotoController : ControllerBase
    {
        private readonly ProductPhotoService _mongoDbService;

        public ProductPhotoController(ProductPhotoService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/ProductPhoto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductPhoto>>> GetAllProductPhotos()
        {
            var productPhotos = await _mongoDbService.GetAllProductPhotosAsync();

            if (productPhotos == null || !productPhotos.Any())
            {
                return NotFound(new { message = "No product photos found in the MongoDB database." });
            }

            return Ok(productPhotos);
        }

        // GET: api/ProductPhoto/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductPhoto>> GetProductPhoto(string id)
        {
            var productPhoto = await _mongoDbService.GetProductPhotoByIdAsync(id);
            if (productPhoto == null)
            {
                return NotFound(new { message = $"Product photo with ID '{id}' not found." });
            }

            return Ok(productPhoto);
        }

        // POST: api/ProductPhoto
        [HttpPost]
        public async Task<ActionResult<ProductPhotoDTO>> PostProductPhoto(ProductPhotoDTO productPhotoDto)
        {
            string idAsString = productPhotoDto.Product_Code.ToString();
            ProductPhoto originalBson = await _mongoDbService.GetProductPhotoByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Product photo with Product Code '{productPhotoDto.Product_Code}' already exists." });
            }

            var newProductPhoto = new ProductPhoto
            {
                Product_Code = productPhotoDto.Product_Code.ToString(),  // Convert to string
                PhotoURL = productPhotoDto.PhotoURL
            };

            await _mongoDbService.AddProductPhotoAsync(newProductPhoto);

            return CreatedAtAction(nameof(GetProductPhoto), new { id = productPhotoDto.Product_Code }, productPhotoDto);
        }

        // PUT: api/ProductPhoto/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductPhoto(string id, ProductPhotoDTO productPhotoDtoUpdate)
        {
            ProductPhoto originalBson = await _mongoDbService.GetProductPhotoByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Product photo with ID '{id}' not found." });
            }

            originalBson.PhotoURL = productPhotoDtoUpdate.PhotoURL;

            await _mongoDbService.UpdateProductPhotoAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/ProductPhoto/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductPhoto(string id)
        {
            var originalBson = await _mongoDbService.GetProductPhotoByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Product photo with ID '{id}' not found." });
            }

            await _mongoDbService.DeleteProductPhotoAsync(id);

            return NoContent();
        }
    }
}
