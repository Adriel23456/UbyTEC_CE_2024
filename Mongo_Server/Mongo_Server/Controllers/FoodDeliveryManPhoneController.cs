using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodDeliveryMan_PhoneController : ControllerBase
    {
        private readonly FoodDeliveryManPhoneService _mongoDbService;

        public FoodDeliveryMan_PhoneController(FoodDeliveryManPhoneService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/FoodDeliveryMan_Phone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodDeliveryManPhone>>> GetAllFoodDeliveryManPhones()
        {
            var foodDeliveryManPhones = await _mongoDbService.GetAllFoodDeliveryManPhonesAsync();

            if (foodDeliveryManPhones == null || !foodDeliveryManPhones.Any())
            {
                return NotFound(new { message = "No food delivery man phones found in the MongoDB database." });
            }

            return Ok(foodDeliveryManPhones);
        }

        // GET: api/FoodDeliveryMan_Phone/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodDeliveryManPhone>> GetFoodDeliveryManPhoneById(string id)
        {
            var foodDeliveryManPhone = await _mongoDbService.GetFoodDeliveryManPhoneByIdAsync(id);
            if (foodDeliveryManPhone == null)
            {
                return NotFound(new { message = $"Food delivery man phone with UserId '{id}' not found." });
            }

            return Ok(foodDeliveryManPhone);
        }

        // POST: api/FoodDeliveryMan_Phone
        [HttpPost]
        public async Task<ActionResult<FoodDeliveryManPhoneDTO>> PostFoodDeliveryManPhone(FoodDeliveryManPhoneDTO foodDeliveryManPhoneDto)
        {
            string userIdAsString = foodDeliveryManPhoneDto.FoodDeliveryMan_UserId;

            var originalBson = await _mongoDbService.GetFoodDeliveryManPhoneByIdAsync(userIdAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Food delivery man phone with UserId '{userIdAsString}' already exists." });
            }

            var newFoodDeliveryManPhone = new FoodDeliveryManPhone
            {
                FoodDeliveryMan_UserId = userIdAsString,
                Phone = foodDeliveryManPhoneDto.Phone
            };

            await _mongoDbService.AddFoodDeliveryManPhoneAsync(newFoodDeliveryManPhone);

            return CreatedAtAction(nameof(GetFoodDeliveryManPhoneById), new { id = foodDeliveryManPhoneDto.FoodDeliveryMan_UserId }, foodDeliveryManPhoneDto);
        }

        // PUT: api/FoodDeliveryMan_Phone/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFoodDeliveryManPhone(string id, FoodDeliveryManPhoneDTO foodDeliveryManPhoneDtoUpdate)
        {
            var originalBson = await _mongoDbService.GetFoodDeliveryManPhoneByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Food delivery man phone with UserId '{id}' not found." });
            }

            originalBson.Phone = foodDeliveryManPhoneDtoUpdate.Phone;

            await _mongoDbService.UpdateFoodDeliveryManPhoneAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/FoodDeliveryMan_Phone/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodDeliveryManPhone(string id)
        {
            var originalBson = await _mongoDbService.GetFoodDeliveryManPhoneByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Food delivery man phone with UserId '{id}' not found." });
            }

            await _mongoDbService.DeleteFoodDeliveryManPhoneAsync(id);

            return NoContent();
        }
    }
}
