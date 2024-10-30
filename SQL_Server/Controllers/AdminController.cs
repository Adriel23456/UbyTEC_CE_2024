using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.Models;
using SQL_Server.DTOs;

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
            var admins = await _context.Admins.Include(a => a.AdminPhones).ToListAsync();
            return _mapper.Map<List<AdminDTO>>(admins);
        }

        // GET: api/Admin/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminDTO>> GetAdmin(int id)
        {
            var admin = await _context.Admins.Include(a => a.AdminPhones)
                                             .FirstOrDefaultAsync(a => a.Id == id);

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
            // Verificar si ya existe un Admin con el mismo Id
            if (await _context.Admins.AnyAsync(a => a.Id == adminDtoCreate.Id))
            {
                return Conflict(new { message = $"An Admin with Id {adminDtoCreate.Id} already exists." });
            }

            // Verificar si UserId es único
            if (await _context.Admins.AnyAsync(a => a.UserId == adminDtoCreate.UserId))
            {
                return Conflict(new { message = $"The UserId '{adminDtoCreate.UserId}' is already in use." });
            }

            // Mapear el DTO de creación a la entidad Admin
            var admin = _mapper.Map<Admin>(adminDtoCreate);
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            var createdAdminDto = _mapper.Map<AdminDTO>(admin);

            return CreatedAtAction(nameof(GetAdmin), new { id = admin.Id }, createdAdminDto);
        }

        // PUT: api/Admin/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(int id, AdminDTO_Update adminDtoUpdate)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            // Actualizar las propiedades permitidas
            admin.Name = adminDtoUpdate.Name;
            admin.FirstSurname = adminDtoUpdate.FirstSurname;
            admin.SecondSurname = adminDtoUpdate.SecondSurname;
            admin.Province = adminDtoUpdate.Province;
            admin.Canton = adminDtoUpdate.Canton;
            admin.District = adminDtoUpdate.District;
            admin.UserId = adminDtoUpdate.UserId;
            admin.Password = adminDtoUpdate.Password;

            // Verificar si el nuevo UserId ya está en uso por otro Admin
            if (await _context.Admins.AnyAsync(a => a.UserId == admin.UserId && a.Id != id))
            {
                return Conflict(new { message = $"The UserId '{admin.UserId}' is already in use." });
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
                {
                    return NotFound(new { message = $"Admin with Id {id} not found." });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Admin/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound(new { message = $"Admin with Id {id} not found." });
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminExists(int id)
        {
            return _context.Admins.Any(e => e.Id == id);
        }
    }
}
