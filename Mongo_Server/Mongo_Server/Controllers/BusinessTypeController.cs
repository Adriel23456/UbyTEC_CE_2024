using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessTypeController : ControllerBase
    {
        private readonly BusinessTypeService _mongoDbService;

        public BusinessTypeController(BusinessTypeService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/BusinessType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessType>>> GetAllBusinessTypes()
        {
            var businessTypes = await _mongoDbService.GetAllBusinessTypesAsync();

            if (businessTypes == null || !businessTypes.Any())
            {
                return NotFound(new { message = "No business types found in the MongoDB database." });
            }

            return Ok(businessTypes);
        }

        // GET: api/BusinessType/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessType>> GetBusinessType(long id)
        {
            string idAsString = id.ToString(); // Convert the ID to string
            var businessType = await _mongoDbService.GetBusinessTypeByIdAsync(idAsString); // Use Id in the function name
            if (businessType == null)
            {
                return NotFound(new { message = $"Business type with Id {idAsString} not found." });
            }

            return Ok(businessType);
        }

        // POST: api/BusinessType
        [HttpPost]
        public async Task<ActionResult<BusinessTypeDTO>> PostBusinessType(BusinessTypeDTO businessTypeDto)
        {
            string idAsString = businessTypeDto.Identification.ToString(); // Convert the Identification to string
            var originalBson = await _mongoDbService.GetBusinessTypeByIdAsync(idAsString); // Use Id in the function name
            if (originalBson != null)
            {
                return Conflict(new { message = $"Business type with Identification '{idAsString}' already exists." });
            }
            
            var newBusinessType = new BusinessType
            {
                Identification = idAsString,
                Name = businessTypeDto.Name
            };

            await _mongoDbService.AddBusinessTypeAsync(newBusinessType);

            return CreatedAtAction(nameof(GetBusinessType), new { id = businessTypeDto.Identification }, businessTypeDto);
        }

        // PUT: api/BusinessType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessType(long id, BusinessTypeDTO businessTypeDtoUpdate)
        {
            string idAsString = id.ToString(); // Convert the ID to string
            var originalBson = await _mongoDbService.GetBusinessTypeByIdAsync(idAsString); // Use Id in the function name
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business type with Id '{idAsString}' not found." });
            }

            originalBson.Name = businessTypeDtoUpdate.Name;

            await _mongoDbService.UpdateBusinessTypeAsync(id, originalBson); // Use Id in the function name

            return NoContent();
        }

        // DELETE: api/BusinessType/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessType(long id)
        {
            string idAsString = id.ToString(); // Convert the ID to string
            var originalBson = await _mongoDbService.GetBusinessTypeByIdAsync(idAsString); // Use Id in the function name
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business type with Id '{idAsString}' not found." });
            }

            await _mongoDbService.DeleteBusinessTypeAsync(id); // Use Id in the function name

            return NoContent();
        }
    }
}
