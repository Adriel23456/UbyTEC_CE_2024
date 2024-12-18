using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminPhoneController : ControllerBase
    {
        private readonly AdminPhoneService _mongoDbService;

        public AdminPhoneController(AdminPhoneService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/AdminPhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminPhone>>> GetMongoAdminPhones()
        {
            var mongoAdminPhones = await _mongoDbService.GetAllAdminPhonesAsync();

            if (mongoAdminPhones == null || !mongoAdminPhones.Any())
            {
                return NotFound(new { message = "No admin phones found in the MongoDB database." });
            }

            return Ok(mongoAdminPhones);
        }

        // GET: api/AdminPhone/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedBack(string id)
        {
            var adminPhone = await _mongoDbService.GetAdminPhoneByIdAsync(id);
            if (adminPhone == null)
            {
                return NotFound(new { message = $"FeedBack with Id {id} not found." });
            }

            return Ok(adminPhone);
        }

        // POST: api/AdminPhone
        [HttpPost]
        public async Task<ActionResult<AdminPhoneDTO>> PostAdminPhone(AdminPhoneDTO adminPhoneDto)
        {
            string adminIdAsString = (adminPhoneDto.Admin_id).ToString();
            var newAdminPhone = new AdminPhone
            {
                Admin_id = adminIdAsString,
                Phone = adminPhoneDto.Phone
            };

            await _mongoDbService.AddAdminPhoneAsync(newAdminPhone);

            return Ok(adminPhoneDto);
        }

        // PUT: api/AdminPhone/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminPhone(string id, AdminPhoneDTO adminPhoneDtoUpdate)
        {
            
            AdminPhone originalBson = await _mongoDbService.GetAdminPhoneByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"AdminPhone with Id '{id}' not found." });
            }
            originalBson.Phone = adminPhoneDtoUpdate.Phone;

            await _mongoDbService.UpdateAdminPhoneAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/AdminPhone/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminPhone(string id)
        {
            AdminPhone originalBson = await _mongoDbService.GetAdminPhoneByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"AdminPhone with Id '{id}' not found." });
            }
            await _mongoDbService.DeleteAdminPhoneAsync(id);

            return NoContent();
        }
    }
}
