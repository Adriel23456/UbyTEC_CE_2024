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
    public class AdminPhoneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AdminPhoneController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/AdminPhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminPhoneDTO>>> GetAdminPhones()
        {
            var adminPhones = await _context.AdminPhones.Include(ap => ap.Admin).ToListAsync();
            return _mapper.Map<List<AdminPhoneDTO>>(adminPhones);
        }

        // POST: api/AdminPhone
        [HttpPost]
        public async Task<ActionResult<AdminPhoneDTO>> PostAdminPhone(AdminPhoneDTO adminPhoneDto)
        {
            // Verificar si ya existe un AdminPhone con la misma clave compuesta
            if (await _context.AdminPhones.AnyAsync(ap => ap.Admin_id == adminPhoneDto.Admin_id && ap.Phone == adminPhoneDto.Phone))
            {
                return Conflict(new { message = $"An AdminPhone with Admin_id {adminPhoneDto.Admin_id} and Phone {adminPhoneDto.Phone} already exists." });
            }

            var adminPhone = _mapper.Map<AdminPhone>(adminPhoneDto);

            // Verificar si el Admin_id existe
            var adminExists = await _context.Admins.AnyAsync(a => a.Id == adminPhone.Admin_id);
            if (!adminExists)
            {
                return BadRequest(new { message = $"Admin with Id {adminPhone.Admin_id} does not exist." });
            }

            _context.AdminPhones.Add(adminPhone);
            await _context.SaveChangesAsync();

            var createdAdminPhoneDto = _mapper.Map<AdminPhoneDTO>(adminPhone);

            // Reemplazar CreatedAtAction con Created, ya que GetAdminPhone no existe
            return Created(string.Empty, createdAdminPhoneDto);
        }

        // PUT: api/AdminPhone/{admin_id}/{phone}
        [HttpPut("{admin_id}/{phone}")]
        public async Task<IActionResult> PutAdminPhone(int admin_id, int phone, AdminPhoneDTO_Update adminPhoneDtoUpdate)
        {
            var adminPhone = await _context.AdminPhones.FirstOrDefaultAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);

            if (adminPhone == null)
            {
                return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {phone} not found." });
            }

            // Actualizar la propiedad permitida
            adminPhone.Phone = adminPhoneDtoUpdate.Phone;

            // Verificar si ya existe otro AdminPhone con el nuevo Phone para el mismo Admin
            if (await _context.AdminPhones.AnyAsync(ap => ap.Admin_id == admin_id && ap.Phone == adminPhoneDtoUpdate.Phone && !(ap.Admin_id == admin_id && ap.Phone == phone)))
            {
                return Conflict(new { message = $"An AdminPhone with Admin_id {admin_id} and Phone {adminPhoneDtoUpdate.Phone} already exists." });
            }

            _context.Entry(adminPhone).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminPhoneExists(admin_id, adminPhoneDtoUpdate.Phone))
                {
                    return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {adminPhoneDtoUpdate.Phone} not found." });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/AdminPhone/{admin_id}/{phone}
        [HttpDelete("{admin_id}/{phone}")]
        public async Task<IActionResult> DeleteAdminPhone(int admin_id, int phone)
        {
            var adminPhone = await _context.AdminPhones
                                           .FirstOrDefaultAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);
            if (adminPhone == null)
            {
                return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {phone} not found." });
            }

            _context.AdminPhones.Remove(adminPhone);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminPhoneExists(int admin_id, int phone)
        {
            return _context.AdminPhones.Any(ap => ap.Admin_id == admin_id && ap.Phone == phone);
        }
    }
}