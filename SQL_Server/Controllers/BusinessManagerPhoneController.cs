using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessManagerPhoneController : ControllerBase
    {
        private readonly BusinessManagerPhoneService _mongoDbService;

        public BusinessManagerPhoneController(BusinessManagerPhoneService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/BusinessManagerPhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessManagerPhone>>> GetAllBusinessManagerPhones()
        {
            var businessManagerPhones = await _mongoDbService.GetAllBusinessManagersPhonesAsync();

            if (businessManagerPhones == null || !businessManagerPhones.Any())
            {
                return NotFound(new { message = "No business manager phones found in the MongoDB database." });
            }

            return Ok(businessManagerPhones);
        }

        // GET: api/BusinessManagerPhone/{email}
        [HttpGet("{email}")]
        public async Task<ActionResult<BusinessManagerPhone>> GetBusinessManagerPhone(string email)
        {
            var businessManagerPhone = await _mongoDbService.GetBusinessManagerPhoneByIdAsync(email);
            if (businessManagerPhone == null)
            {
                return NotFound(new { message = $"Business manager phone with email {email} not found." });
            }

            return Ok(businessManagerPhone);
        }

        // POST: api/BusinessManagerPhone
        [HttpPost]
        public async Task<ActionResult<BusinessManagerPhoneDTO>> PostBusinessManagerPhone(BusinessManagerPhoneDTO businessManagerPhoneDto)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerPhoneByIdAsync(businessManagerPhoneDto.BusinessManager_Email);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Business manager phone with email '{businessManagerPhoneDto.BusinessManager_Email}' already exists." });
            }
            
            var newBusinessManagerPhone = new BusinessManagerPhone
            {
                BusinessManager_Email = businessManagerPhoneDto.BusinessManager_Email,
                Phone = businessManagerPhoneDto.Phone
            };

            await _mongoDbService.AddBusinessManagerPhoneAsync(newBusinessManagerPhone);

            return CreatedAtAction(nameof(GetBusinessManagerPhone), new { email = businessManagerPhoneDto.BusinessManager_Email }, businessManagerPhoneDto);
        }

        // PUT: api/BusinessManagerPhone/{email}
        [HttpPut("{email}")]
        public async Task<IActionResult> PutBusinessManagerPhone(string email, BusinessManagerPhoneDTO businessManagerPhoneDtoUpdate)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerPhoneByIdAsync(email);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business manager phone with email '{email}' not found." });
            }

            originalBson.Phone = businessManagerPhoneDtoUpdate.Phone;

            await _mongoDbService.UpdateBusinessManagerPhoneAsync(email, originalBson);

            return NoContent();
        }

        // DELETE: api/BusinessManagerPhone/{email}
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteBusinessManagerPhone(string email)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerPhoneByIdAsync(email);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business manager phone with email '{email}' not found." });
            }

            await _mongoDbService.DeleteBusinessManagerPhoneAsync(email);

            return NoContent();
        }
    }
}
