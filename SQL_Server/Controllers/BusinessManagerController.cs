using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessManagerController : ControllerBase
    {
        private readonly BusinessManagerService _mongoDbService;

        public BusinessManagerController(BusinessManagerService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/BusinessManager
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessManager>>> GetAllBusinessManagers()
        {
            var businessManagers = await _mongoDbService.GetAllBusinessManagersAsync();

            if (businessManagers == null || !businessManagers.Any())
            {
                return NotFound(new { message = "No business managers found in the MongoDB database." });
            }

            return Ok(businessManagers);
        }

        // GET: api/BusinessManager/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessManager>> GetBusinessManager(string id)
        {
            var businessManager = await _mongoDbService.GetBusinessManagerByIdAsync(id);
            if (businessManager == null)
            {
                return NotFound(new { message = $"Business manager with user Id {id} not found." });
            }

            return Ok(businessManager);
        }

        // POST: api/BusinessManager
        [HttpPost]
        public async Task<ActionResult<BusinessManagerDTO>> PostBusinessManager(BusinessManagerDTO businessManagerDto)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerByIdAsync(businessManagerDto.UserId);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Business manager with user Id '{businessManagerDto.UserId}' already exists." });
            }
            
            var newBusinessManager = new BusinessManager
            {
                Email = businessManagerDto.Email,
                Name = businessManagerDto.Name,
                FirstSurname = businessManagerDto.FirstSurname,
                SecondSurname = businessManagerDto.SecondSurname,
                FullName = businessManagerDto.FullName,
                Province = businessManagerDto.Province,
                Canton = businessManagerDto.Canton,
                District = businessManagerDto.District,
                Direction = businessManagerDto.Direction,
                UserId = businessManagerDto.UserId,
                Password = businessManagerDto.Password
            };

            await _mongoDbService.AddBusinessManagerAsync(newBusinessManager);

            return CreatedAtAction(nameof(GetBusinessManager), new { id = businessManagerDto.UserId }, businessManagerDto);
        }

        // PUT: api/BusinessManager/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessManager(string id, BusinessManagerDTO businessManagerDtoUpdate)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business manager with user Id '{id}' not found." });
            }

            originalBson.Name = businessManagerDtoUpdate.Name;
            originalBson.FirstSurname = businessManagerDtoUpdate.FirstSurname;
            originalBson.SecondSurname = businessManagerDtoUpdate.SecondSurname;
            originalBson.FullName = businessManagerDtoUpdate.FullName;
            originalBson.Province = businessManagerDtoUpdate.Province;
            originalBson.Canton = businessManagerDtoUpdate.Canton;
            originalBson.District = businessManagerDtoUpdate.District;
            originalBson.Direction = businessManagerDtoUpdate.Direction;
            originalBson.Password = businessManagerDtoUpdate.Password; // Assuming password can be updated

            await _mongoDbService.UpdateBusinessManagerAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/BusinessManager/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessManager(string id)
        {
            var originalBson = await _mongoDbService.GetBusinessManagerByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business manager with user Id '{id}' not found." });
            }

            await _mongoDbService.DeleteBusinessManagerAsync(id);

            return NoContent();
        }
    }
}
