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
    public class FoodDeliveryManController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FoodDeliveryManController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/FoodDeliveryMan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDeliveryManDTO>>> GetFoodDeliveryMen()
        {
            var foodDeliveryMen = await _context.FoodDeliveryMan
                .FromSqlRaw("EXEC sp_GetAllFoodDeliveryMen")
                .ToListAsync();

            return _mapper.Map<List<FoodDeliveryManDTO>>(foodDeliveryMen);
        }

        // GET: api/FoodDeliveryMan/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<FoodDeliveryManDTO>> GetFoodDeliveryMan(string userId)
        {
            var foodDeliveryMen = await _context.FoodDeliveryMan
                .FromSqlRaw("EXEC sp_GetFoodDeliveryManByUserId @UserId = {0}", userId)
                .ToListAsync();

            var foodDeliveryMan = foodDeliveryMen.FirstOrDefault();

            if (foodDeliveryMan == null)
            {
                return NotFound(new { message = $"FoodDeliveryMan with UserId '{userId}' not found." });
            }

            return _mapper.Map<FoodDeliveryManDTO>(foodDeliveryMan);
        }

        // POST: api/FoodDeliveryMan
        [HttpPost]
        public async Task<ActionResult<FoodDeliveryManDTO>> PostFoodDeliveryMan(FoodDeliveryManDTO_Create foodDeliveryManDtoCreate)
        {
            // Validations
            if (await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == foodDeliveryManDtoCreate.UserId))
            {
                return Conflict(new { message = $"A FoodDeliveryMan with UserId '{foodDeliveryManDtoCreate.UserId}' already exists." });
            }

            // Validate State
            if (foodDeliveryManDtoCreate.State != "Disponible" && foodDeliveryManDtoCreate.State != "No disponible")
            {
                return BadRequest(new { message = $"State must be either 'Disponible' or 'No disponible'." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@UserId", foodDeliveryManDtoCreate.UserId),
                new SqlParameter("@Name", foodDeliveryManDtoCreate.Name),
                new SqlParameter("@FirstSurname", foodDeliveryManDtoCreate.FirstSurname),
                new SqlParameter("@SecondSurname", foodDeliveryManDtoCreate.SecondSurname),
                new SqlParameter("@Province", foodDeliveryManDtoCreate.Province),
                new SqlParameter("@Canton", foodDeliveryManDtoCreate.Canton),
                new SqlParameter("@District", foodDeliveryManDtoCreate.District),
                new SqlParameter("@Password", foodDeliveryManDtoCreate.Password),
                new SqlParameter("@State", foodDeliveryManDtoCreate.State)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateFoodDeliveryMan @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @State", parameters);

            // Get the newly created FoodDeliveryMan
            var foodDeliveryMen = await _context.FoodDeliveryMan
                .FromSqlRaw("EXEC sp_GetFoodDeliveryManByUserId @UserId = {0}", foodDeliveryManDtoCreate.UserId)
                .ToListAsync();

            var foodDeliveryMan = foodDeliveryMen.FirstOrDefault();

            var createdFoodDeliveryManDto = _mapper.Map<FoodDeliveryManDTO>(foodDeliveryMan);

            return CreatedAtAction(nameof(GetFoodDeliveryMan), new { userId = foodDeliveryMan?.UserId }, createdFoodDeliveryManDto);
        }

        // PUT: api/FoodDeliveryMan/{userId}
        [HttpPut("{userId}")]
        public async Task<IActionResult> PutFoodDeliveryMan(string userId, FoodDeliveryManDTO_Update foodDeliveryManDtoUpdate)
        {
            // Check if the FoodDeliveryMan exists
            var foodDeliveryManExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == userId);

            if (!foodDeliveryManExists)
            {
                return NotFound(new { message = $"FoodDeliveryMan with UserId '{userId}' not found." });
            }

            // Validate State
            if (foodDeliveryManDtoUpdate.State != "Disponible" && foodDeliveryManDtoUpdate.State != "No disponible")
            {
                return BadRequest(new { message = $"State must be either 'Disponible' or 'No disponible'." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@Name", foodDeliveryManDtoUpdate.Name),
                new SqlParameter("@FirstSurname", foodDeliveryManDtoUpdate.FirstSurname),
                new SqlParameter("@SecondSurname", foodDeliveryManDtoUpdate.SecondSurname),
                new SqlParameter("@Province", foodDeliveryManDtoUpdate.Province),
                new SqlParameter("@Canton", foodDeliveryManDtoUpdate.Canton),
                new SqlParameter("@District", foodDeliveryManDtoUpdate.District),
                new SqlParameter("@Password", foodDeliveryManDtoUpdate.Password),
                new SqlParameter("@State", foodDeliveryManDtoUpdate.State)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateFoodDeliveryMan @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @State", parameters);

            return NoContent();
        }

        // DELETE: api/FoodDeliveryMan/{userId}
        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteFoodDeliveryMan(string userId)
        {
            // Check if the FoodDeliveryMan exists
            var foodDeliveryManExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == userId);

            if (!foodDeliveryManExists)
            {
                return NotFound(new { message = $"FoodDeliveryMan with UserId '{userId}' not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteFoodDeliveryMan @UserId = {0}", userId);

            return NoContent();
        }
    }
}