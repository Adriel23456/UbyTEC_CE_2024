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
            var adminPhones = await _context.AdminPhone.Include(ap => ap.Admin).ToListAsync();
            return _mapper.Map<List<AdminPhoneDTO>>(adminPhones);
        }

        // POST: api/AdminPhone
        [HttpPost]
        public async Task<ActionResult<AdminPhoneDTO>> PostAdminPhone(AdminPhoneDTO adminPhoneDto)
        {
            // Verificar si ya existe un AdminPhone con la misma clave compuesta
            if (await _context.AdminPhone.AnyAsync(ap => ap.Admin_id == adminPhoneDto.Admin_id && ap.Phone == adminPhoneDto.Phone))
            {
                return Conflict(new { message = $"An AdminPhone with Admin_id {adminPhoneDto.Admin_id} and Phone {adminPhoneDto.Phone} already exists." });
            }

            var adminPhone = _mapper.Map<AdminPhone>(adminPhoneDto);

            // Verificar si el Admin_id existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == adminPhone.Admin_id);
            if (!adminExists)
            {
                return BadRequest(new { message = $"Admin with Id {adminPhone.Admin_id} does not exist." });
            }

            _context.AdminPhone.Add(adminPhone);
            await _context.SaveChangesAsync();

            var createdAdminPhoneDto = _mapper.Map<AdminPhoneDTO>(adminPhone);

            // Reemplazar CreatedAtAction con Created, ya que GetAdminPhone no existe
            return Created(string.Empty, createdAdminPhoneDto);
        }

        // PUT: api/AdminPhone/{admin_id}/{phone}
        [HttpPut("{admin_id}/{phone}")]
        public async Task<IActionResult> PutAdminPhone(int admin_id, int phone, AdminPhoneDTO_Update adminPhoneDtoUpdate)
        {
            // Verificar si la entidad actual existe
            var existingAdminPhone = await _context.AdminPhone
                .FirstOrDefaultAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);

            if (existingAdminPhone == null)
            {
                return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {phone} not found." });
            }

            int newPhone = adminPhoneDtoUpdate.Phone;

            // Si el nuevo Phone es igual al existente, no hay nada que actualizar
            if (newPhone == phone)
            {
                return NoContent();
            }

            // Verificar si ya existe una entidad con el nuevo Phone para el mismo Admin_id
            if (await _context.AdminPhone.AnyAsync(ap => ap.Admin_id == admin_id && ap.Phone == newPhone))
            {
                return Conflict(new { message = $"An AdminPhone with Admin_id {admin_id} and Phone {newPhone} already exists." });
            }

            // Eliminar la entidad existente
            _context.AdminPhone.Remove(existingAdminPhone);

            // Crear una nueva entidad con el nuevo Phone
            var newAdminPhone = new AdminPhone
            {
                Admin_id = admin_id,
                Phone = newPhone
            };

            // Agregar la nueva entidad al contexto
            _context.AdminPhone.Add(newAdminPhone);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Manejar posibles excepciones y retornar un error apropiado
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while updating the AdminPhone.", details = ex.Message });
            }
            return NoContent();
        }

        // DELETE: api/AdminPhone/{admin_id}/{phone}
        [HttpDelete("{admin_id}/{phone}")]
        public async Task<IActionResult> DeleteAdminPhone(int admin_id, int phone)
        {
            var adminPhone = await _context.AdminPhone
                                           .FirstOrDefaultAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);
            if (adminPhone == null)
            {
                return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {phone} not found." });
            }

            _context.AdminPhone.Remove(adminPhone);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        private bool AdminPhoneExists(int admin_id, int phone)
        {
            return _context.AdminPhone.Any(ap => ap.Admin_id == admin_id && ap.Phone == phone);
        }

        // GET: api/AdminPhone/Admin/{admin_id}/Phones
        [HttpGet("{admin_id}/Phones")]
        public async Task<ActionResult<IEnumerable<AdminPhoneDTO>>> GetPhonesByAdminId(int admin_id)
        {
            // Verificar si el Admin existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == admin_id);
            if (!adminExists)
            {
                return NotFound(new { message = $"Admin with Id {admin_id} not found." });
            }

            // Obtener todas las entidades AdminPhone asociadas al Admin_id
            var adminPhones = await _context.AdminPhone
                .Where(ap => ap.Admin_id == admin_id)
                .ToListAsync();

            // Mapear las entidades a DTOs
            var adminPhoneDtos = _mapper.Map<List<AdminPhoneDTO>>(adminPhones);

            return Ok(adminPhoneDtos);
        }
    }
}