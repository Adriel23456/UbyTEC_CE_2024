using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SQL_Server.DTOs;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _mongoDbService;

        public AdminController(AdminService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetMongoAdmins()
        {
            var mongoAdmins = await _mongoDbService.GetAllAdminsAsync();

            if (mongoAdmins == null || !mongoAdmins.Any())
            {
                return NotFound(new { message = "No admins found in the MongoDB database." });
            }

            return Ok(mongoAdmins);
        }

        // GET: api/Admin/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(string id)
        {
            var admin = await _mongoDbService.GetAdminByIdAsync(id);
            if (admin == null)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            return Ok(admin);
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<AdminDTO>> PostAdmin(AdminDTO adminDto)
        {   
            string adminIdAsString = (adminDto.Id).ToString();
            var existingAdmin = await _mongoDbService.GetAdminByIdAsync(adminDto.Id.ToString());
            if (existingAdmin != null)
            {
                return Conflict(new { message = $"Admin with Id '{adminDto.Id}' already exists." });
            }

            var newAdmin = new Admin
            {
                Id = adminIdAsString,
                Name = adminDto.Name,
                FirstSurname = adminDto.FirstSurname,
                SecondSurname = adminDto.SecondSurname,
                Province = adminDto.Province,
                Canton = adminDto.Canton,
                District = adminDto.District,
                UserId = adminDto.UserId,
                Password = adminDto.Password
            };

            await _mongoDbService.AddAdminAsync(newAdmin);

            return CreatedAtAction(nameof(GetAdmin), new { id = adminDto.Id }, adminDto);
        }

        // PUT: api/Admin/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(string id, AdminDTO adminDtoUpdate)
        {
            var existingAdmin = await _mongoDbService.GetAdminByIdAsync(id);
            if (existingAdmin == null)
            {
                return NotFound(new { message = $"Admin with Id '{id}' not found." });
            }

            existingAdmin.Name = adminDtoUpdate.Name;
            existingAdmin.FirstSurname = adminDtoUpdate.FirstSurname;
            existingAdmin.SecondSurname = adminDtoUpdate.SecondSurname;
            existingAdmin.Province = adminDtoUpdate.Province;
            existingAdmin.Canton = adminDtoUpdate.Canton;
            existingAdmin.District = adminDtoUpdate.District;
            existingAdmin.UserId = adminDtoUpdate.UserId;
            existingAdmin.Password = adminDtoUpdate.Password;

            await _mongoDbService.UpdateAdminAsync(id, existingAdmin);

            return NoContent();
        }

        // DELETE: api/Admin/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(string id)
        {
            var existingAdmin = await _mongoDbService.GetAdminByIdAsync(id);
            if (existingAdmin == null)
            {
                return NotFound(new { message = $"Admin with Id '{id}' not found." });
            }

            await _mongoDbService.DeleteAdminAsync(id);

            return NoContent();
        }
    }
}
