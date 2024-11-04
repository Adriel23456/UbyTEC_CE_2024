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
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmins()
        {
            var admins = await _context.Admin
                .FromSqlRaw("EXEC sp_GetAllAdmins")
                .ToListAsync();

            return _mapper.Map<List<AdminDTO>>(admins);
        }

        // GET: api/Admin/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDTO>> GetAdmin(long id)
        {
            var admins = await _context.Admin
                .FromSqlRaw("EXEC sp_GetAdminById @Id = {0}", id)
                .ToListAsync();

            var admin = admins.FirstOrDefault();

            if (admin == null)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            return _mapper.Map<AdminDTO>(admin);
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<AdminDTO>> PostAdmin(AdminDTO_Create adminDtoCreate)
        {
            // Validación
            if (await _context.Admin.AnyAsync(a => a.Id == adminDtoCreate.Id))
            {
                return Conflict(new { message = $"An Admin with Id {adminDtoCreate.Id} already exists." });
            }

            if (await _context.Admin.AnyAsync(a => a.UserId == adminDtoCreate.UserId))
            {
                return Conflict(new { message = $"The UserId '{adminDtoCreate.UserId}' is already in use." });
            }

            // Llamada al Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Id", adminDtoCreate.Id),
                new SqlParameter("@Name", adminDtoCreate.Name),
                new SqlParameter("@FirstSurname", adminDtoCreate.FirstSurname),
                new SqlParameter("@SecondSurname", adminDtoCreate.SecondSurname),
                new SqlParameter("@Province", adminDtoCreate.Province),
                new SqlParameter("@Canton", adminDtoCreate.Canton),
                new SqlParameter("@District", adminDtoCreate.District),
                new SqlParameter("@UserId", adminDtoCreate.UserId),
                new SqlParameter("@Password", adminDtoCreate.Password)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateAdmin @Id, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password", parameters);

            var admins = await _context.Admin
                .FromSqlRaw("EXEC sp_GetAdminById @Id = {0}", adminDtoCreate.Id)
                .ToListAsync();

            var admin = admins.FirstOrDefault();

            var createdAdminDto = _mapper.Map<AdminDTO>(admin);

            return CreatedAtAction(nameof(GetAdmin), new { id = admin?.Id }, createdAdminDto);
        }

        // PUT: api/Admin/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(long id, AdminDTO_Update adminDtoUpdate)
        {
            // Verificar si el Admin existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == id);

            if (!adminExists)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            // Verificar si el nuevo UserId ya está en uso por otro Admin
            if (await _context.Admin.AnyAsync(a => a.UserId == adminDtoUpdate.UserId && a.Id != id))
            {
                return Conflict(new { message = $"The UserId '{adminDtoUpdate.UserId}' is already in use." });
            }

            // Llamada al Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Id", id),
                new SqlParameter("@Name", adminDtoUpdate.Name),
                new SqlParameter("@FirstSurname", adminDtoUpdate.FirstSurname),
                new SqlParameter("@SecondSurname", adminDtoUpdate.SecondSurname),
                new SqlParameter("@Province", adminDtoUpdate.Province),
                new SqlParameter("@Canton", adminDtoUpdate.Canton),
                new SqlParameter("@District", adminDtoUpdate.District),
                new SqlParameter("@UserId", adminDtoUpdate.UserId),
                new SqlParameter("@Password", adminDtoUpdate.Password)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateAdmin @Id, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password", parameters);

            return NoContent();
        }

        // DELETE: api/Admin/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(long id)
        {
            // Verificar si el Admin existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == id);

            if (!adminExists)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            // Llamada al Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteAdmin @Id = {0}", id);

            return NoContent();
        }

        // POST: api/Admin/Authenticate
        [HttpPost("Authenticate")]
        public async Task<ActionResult<AdminDTO>> Authenticate(AdminDTO_Login loginDto)
        {
            // Call the stored procedure
            var parameters = new[]
            {
                new SqlParameter("@UserId", loginDto.UserId),
                new SqlParameter("@Password", loginDto.Password)
            };

            var admins = await _context.Admin
                .FromSqlRaw("EXEC sp_AuthenticateAdmin @UserId, @Password", parameters)
                .ToListAsync();

            var admin = admins.FirstOrDefault();

            if (admin == null)
            {
                // Check if UserId exists
                var userIdExists = await _context.Admin.AnyAsync(a => a.UserId == loginDto.UserId);
                if (!userIdExists)
                {
                    return NotFound(new { message = $"UserId '{loginDto.UserId}' not found." });
                }
                else
                {
                    return Unauthorized(new { message = "Incorrect password." });
                }
            }

            var adminDto = _mapper.Map<AdminDTO>(admin);

            return Ok(adminDto);
        }
    }
}