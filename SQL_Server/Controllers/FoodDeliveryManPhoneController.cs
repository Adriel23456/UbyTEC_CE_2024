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
    public class FoodDeliveryManPhoneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FoodDeliveryManPhoneController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/FoodDeliveryManPhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDeliveryManPhoneDTO>>> GetFoodDeliveryManPhones()
        {
            var foodDeliveryManPhones = await _context.FoodDeliveryManPhone
                .FromSqlRaw("EXEC sp_GetAllFoodDeliveryManPhones")
                .ToListAsync();

            return _mapper.Map<List<FoodDeliveryManPhoneDTO>>(foodDeliveryManPhones);
        }

        // GET: api/FoodDeliveryManPhone/{userId}/Phones
        [HttpGet("{userId}/Phones")]
        public async Task<ActionResult<IEnumerable<FoodDeliveryManPhoneDTO>>> GetPhonesByUserId(string userId)
        {
            // Check if the FoodDeliveryMan exists
            var foodDeliveryManExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == userId);
            if (!foodDeliveryManExists)
            {
                return NotFound(new { message = $"FoodDeliveryMan with UserId '{userId}' not found." });
            }

            // Call Stored Procedure
            var foodDeliveryManPhones = await _context.FoodDeliveryManPhone
                .FromSqlRaw("EXEC sp_GetFoodDeliveryManPhonesByUserId @FoodDeliveryMan_UserId = {0}", userId)
                .ToListAsync();

            var foodDeliveryManPhoneDtos = _mapper.Map<List<FoodDeliveryManPhoneDTO>>(foodDeliveryManPhones);

            return Ok(foodDeliveryManPhoneDtos);
        }

        // POST: api/FoodDeliveryManPhone
        [HttpPost]
        public async Task<ActionResult<FoodDeliveryManPhoneDTO>> PostFoodDeliveryManPhone(FoodDeliveryManPhoneDTO foodDeliveryManPhoneDto)
        {
            // Validation
            if (await _context.FoodDeliveryManPhone.AnyAsync(fdmp => fdmp.FoodDeliveryMan_UserId == foodDeliveryManPhoneDto.FoodDeliveryMan_UserId && fdmp.Phone == foodDeliveryManPhoneDto.Phone))
            {
                return Conflict(new { message = $"A FoodDeliveryManPhone with UserId '{foodDeliveryManPhoneDto.FoodDeliveryMan_UserId}' and Phone {foodDeliveryManPhoneDto.Phone} already exists." });
            }

            // Check if the FoodDeliveryMan_UserId exists
            var foodDeliveryManExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == foodDeliveryManPhoneDto.FoodDeliveryMan_UserId);
            if (!foodDeliveryManExists)
            {
                return BadRequest(new { message = $"FoodDeliveryMan with UserId '{foodDeliveryManPhoneDto.FoodDeliveryMan_UserId}' does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@FoodDeliveryMan_UserId", foodDeliveryManPhoneDto.FoodDeliveryMan_UserId),
                new SqlParameter("@Phone", foodDeliveryManPhoneDto.Phone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateFoodDeliveryManPhone @FoodDeliveryMan_UserId, @Phone", parameters);

            // Get the newly created FoodDeliveryManPhone
            var foodDeliveryManPhones = await _context.FoodDeliveryManPhone
                .FromSqlRaw("SELECT * FROM [FoodDeliveryManPhone] WHERE [FoodDeliveryMan_UserId] = {0} AND [Phone] = {1}", foodDeliveryManPhoneDto.FoodDeliveryMan_UserId, foodDeliveryManPhoneDto.Phone)
                .ToListAsync();

            var foodDeliveryManPhone = foodDeliveryManPhones.FirstOrDefault();

            var createdFoodDeliveryManPhoneDto = _mapper.Map<FoodDeliveryManPhoneDTO>(foodDeliveryManPhone);

            return CreatedAtAction(nameof(GetPhonesByUserId), new { userId = foodDeliveryManPhone?.FoodDeliveryMan_UserId }, createdFoodDeliveryManPhoneDto);
        }

        // PUT: api/FoodDeliveryManPhone/{userId}/{phone}
        [HttpPut("{userId}/{phone}")]
        public async Task<IActionResult> PutFoodDeliveryManPhone(string userId, long phone, FoodDeliveryManPhoneDTO_Update foodDeliveryManPhoneDtoUpdate)
        {
            // Check if the current entity exists
            var foodDeliveryManPhoneExists = await _context.FoodDeliveryManPhone
                .AnyAsync(fdmp => fdmp.FoodDeliveryMan_UserId == userId && fdmp.Phone == phone);

            if (!foodDeliveryManPhoneExists)
            {
                return NotFound(new { message = $"FoodDeliveryManPhone with UserId '{userId}' and Phone {phone} not found." });
            }

            long newPhone = foodDeliveryManPhoneDtoUpdate.Phone;

            // If the new phone is the same as the existing, nothing to update
            if (newPhone == phone)
            {
                return NoContent();
            }

            // Check if there is already an entity with the new phone for the same FoodDeliveryMan_UserId
            if (await _context.FoodDeliveryManPhone.AnyAsync(fdmp => fdmp.FoodDeliveryMan_UserId == userId && fdmp.Phone == newPhone))
            {
                return Conflict(new { message = $"A FoodDeliveryManPhone with UserId '{userId}' and Phone {newPhone} already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@FoodDeliveryMan_UserId", userId),
                new SqlParameter("@OldPhone", phone),
                new SqlParameter("@NewPhone", newPhone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateFoodDeliveryManPhone @FoodDeliveryMan_UserId, @OldPhone, @NewPhone", parameters);

            return NoContent();
        }

        // DELETE: api/FoodDeliveryManPhone/{userId}/{phone}
        [HttpDelete("{userId}/{phone}")]
        public async Task<IActionResult> DeleteFoodDeliveryManPhone(string userId, long phone)
        {
            // Check if the entity exists
            var foodDeliveryManPhoneExists = await _context.FoodDeliveryManPhone
                .AnyAsync(fdmp => fdmp.FoodDeliveryMan_UserId == userId && fdmp.Phone == phone);

            if (!foodDeliveryManPhoneExists)
            {
                return NotFound(new { message = $"FoodDeliveryManPhone with UserId '{userId}' and Phone {phone} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteFoodDeliveryManPhone @FoodDeliveryMan_UserId = {0}, @Phone = {1}", userId, phone);

            return NoContent();
        }
    }
}