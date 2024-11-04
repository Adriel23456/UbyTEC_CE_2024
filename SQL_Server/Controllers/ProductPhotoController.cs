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
    public class ProductPhotoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductPhotoController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ProductPhoto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductPhotoDTO>>> GetProductPhotos()
        {
            var photos = await _context.ProductPhoto
                .FromSqlRaw("EXEC sp_GetAllProductPhotos")
                .ToListAsync();

            return _mapper.Map<List<ProductPhotoDTO>>(photos);
        }

        // GET: api/ProductPhoto/{product_code}/Photos
        [HttpGet("{product_code}/Photos")]
        public async Task<ActionResult<IEnumerable<ProductPhotoDTO>>> GetPhotosByProductCode(long product_code)
        {
            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == product_code);
            if (!productExists)
            {
                return NotFound(new { message = $"Product with Code {product_code} not found." });
            }

            // Call Stored Procedure
            var photos = await _context.ProductPhoto
                .FromSqlRaw("EXEC sp_GetProductPhotosByProductCode @Product_Code = {0}", product_code)
                .ToListAsync();

            var photoDtos = _mapper.Map<List<ProductPhotoDTO>>(photos);

            return Ok(photoDtos);
        }

        // POST: api/ProductPhoto
        [HttpPost]
        public async Task<ActionResult<ProductPhotoDTO>> PostProductPhoto(ProductPhotoDTO photoDto)
        {
            // Validation
            if (await _context.ProductPhoto.AnyAsync(pp => pp.Product_Code == photoDto.Product_Code && pp.PhotoURL == photoDto.PhotoURL))
            {
                return Conflict(new { message = $"A ProductPhoto with Product_Code {photoDto.Product_Code} and PhotoURL '{photoDto.PhotoURL}' already exists." });
            }

            // Check if Product exists
            var productExists = await _context.Product.AnyAsync(p => p.Code == photoDto.Product_Code);
            if (!productExists)
            {
                return BadRequest(new { message = $"Product with Code {photoDto.Product_Code} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Product_Code", photoDto.Product_Code),
                new SqlParameter("@PhotoURL", photoDto.PhotoURL)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateProductPhoto @Product_Code, @PhotoURL", parameters);

            // Retrieve the newly created photo
            var photos = await _context.ProductPhoto
                .FromSqlRaw("SELECT * FROM [ProductPhoto] WHERE [Product_Code] = {0} AND [PhotoURL] = {1}", photoDto.Product_Code, photoDto.PhotoURL)
                .ToListAsync();

            var photo = photos.FirstOrDefault();

            var createdPhotoDto = _mapper.Map<ProductPhotoDTO>(photo);

            return CreatedAtAction(nameof(GetPhotosByProductCode), new { product_code = photo?.Product_Code }, createdPhotoDto);
        }

        // PUT: api/ProductPhoto/{product_code}/{photoURL}
        [HttpPut("{product_code}/{photoURL}")]
        public async Task<IActionResult> PutProductPhoto(long product_code, string photoURL, ProductPhotoDTO_Update photoDtoUpdate)
        {
            // Decode URL-encoded strings if necessary
            photoURL = Uri.UnescapeDataString(photoURL);

            // Check if the current entity exists
            var photoExists = await _context.ProductPhoto.AnyAsync(pp => pp.Product_Code == product_code && pp.PhotoURL == photoURL);

            if (!photoExists)
            {
                return NotFound(new { message = $"ProductPhoto with Product_Code {product_code} and PhotoURL '{photoURL}' not found." });
            }

            string newPhotoURL = photoDtoUpdate.PhotoURL;

            // If the new PhotoURL is the same as the old one, nothing to update
            if (newPhotoURL == photoURL)
            {
                return NoContent();
            }

            // Check if the new PhotoURL already exists for the same Product
            if (await _context.ProductPhoto.AnyAsync(pp => pp.Product_Code == product_code && pp.PhotoURL == newPhotoURL))
            {
                return Conflict(new { message = $"A ProductPhoto with Product_Code {product_code} and PhotoURL '{newPhotoURL}' already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Product_Code", product_code),
                new SqlParameter("@OldPhotoURL", photoURL),
                new SqlParameter("@NewPhotoURL", newPhotoURL)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateProductPhoto @Product_Code, @OldPhotoURL, @NewPhotoURL", parameters);

            return NoContent();
        }

        // DELETE: api/ProductPhoto/{product_code}/{photoURL}
        [HttpDelete("{product_code}/{photoURL}")]
        public async Task<IActionResult> DeleteProductPhoto(long product_code, string photoURL)
        {
            // Decode URL-encoded strings if necessary
            photoURL = Uri.UnescapeDataString(photoURL);

            // Check if the entity exists
            var photoExists = await _context.ProductPhoto.AnyAsync(pp => pp.Product_Code == product_code && pp.PhotoURL == photoURL);

            if (!photoExists)
            {
                return NotFound(new { message = $"ProductPhoto with Product_Code {product_code} and PhotoURL '{photoURL}' not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteProductPhoto @Product_Code = {0}, @PhotoURL = {1}", product_code, photoURL);

            return NoContent();
        }
    }
}