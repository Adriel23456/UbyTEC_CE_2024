using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodDeliveryManController : ControllerBase
    {
        private readonly FoodDeliveryManService _mongoDbService;

        public FoodDeliveryManController(FoodDeliveryManService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/FoodDeliveryMan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDeliveryMan>>> GetAllFoodDeliveryMen()
        {
            var foodDeliveryMen = await _mongoDbService.GetAllFoodDeliveryManAsync();

            if (foodDeliveryMen == null || !foodDeliveryMen.Any())
            {
                return NotFound(new { message = "No food delivery men found in the MongoDB database." });
            }

            return Ok(foodDeliveryMen);
        }

        // GET: api/FoodDeliveryMan/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDeliveryMan>> GetFoodDeliveryManById(string id)
        {
            var foodDeliveryMan = await _mongoDbService.GetFoodDeliveryManByIdAsync(id);
            if (foodDeliveryMan == null)
            {
                return NotFound(new { message = $"Food delivery man with UserId '{id}' not found." });
            }

            return Ok(foodDeliveryMan);
        }

        // POST: api/FoodDeliveryMan
        [HttpPost]
        public async Task<ActionResult<FoodDeliveryManDTO>> PostFoodDeliveryMan(FoodDeliveryManDTO foodDeliveryManDto)
        {
            string userIdAsString = foodDeliveryManDto.UserId;

            var originalBson = await _mongoDbService.GetFoodDeliveryManByIdAsync(userIdAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Food delivery man with UserId '{userIdAsString}' already exists." });
            }

            var newFoodDeliveryMan = new FoodDeliveryMan
            {
                UserId = userIdAsString,
                Name = foodDeliveryManDto.Name,
                FirstSurname = foodDeliveryManDto.FirstSurname,
                SecondSurname = foodDeliveryManDto.SecondSurname,
                FullName = foodDeliveryManDto.FullName,
                Province = foodDeliveryManDto.Province,
                Canton = foodDeliveryManDto.Canton,
                District = foodDeliveryManDto.District,
                Direction = foodDeliveryManDto.Direction,
                Password = foodDeliveryManDto.Password,
                State = foodDeliveryManDto.State
            };

            await _mongoDbService.AddFoodDeliveryManAsync(newFoodDeliveryMan);

            return CreatedAtAction(nameof(GetFoodDeliveryManById), new { id = foodDeliveryManDto.UserId }, foodDeliveryManDto);
        }

        // PUT: api/FoodDeliveryMan/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodDeliveryMan(string id, FoodDeliveryManDTO foodDeliveryManDtoUpdate)
        {
            var originalBson = await _mongoDbService.GetFoodDeliveryManByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Food delivery man with UserId '{id}' not found." });
            }

            originalBson.Name = foodDeliveryManDtoUpdate.Name;
            originalBson.FirstSurname = foodDeliveryManDtoUpdate.FirstSurname;
            originalBson.SecondSurname = foodDeliveryManDtoUpdate.SecondSurname;
            originalBson.FullName = foodDeliveryManDtoUpdate.FullName;
            originalBson.Province = foodDeliveryManDtoUpdate.Province;
            originalBson.Canton = foodDeliveryManDtoUpdate.Canton;
            originalBson.District = foodDeliveryManDtoUpdate.District;
            originalBson.Direction = foodDeliveryManDtoUpdate.Direction;
            originalBson.Password = foodDeliveryManDtoUpdate.Password;
            originalBson.State = foodDeliveryManDtoUpdate.State;

            await _mongoDbService.UpdateFoodDeliveryManAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/FoodDeliveryMan/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodDeliveryMan(string id)
        {
            var originalBson = await _mongoDbService.GetFoodDeliveryManByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Food delivery man with UserId '{id}' not found." });
            }

            await _mongoDbService.DeleteFoodDeliveryManAsync(id);

            return NoContent();
        }
    }
}
