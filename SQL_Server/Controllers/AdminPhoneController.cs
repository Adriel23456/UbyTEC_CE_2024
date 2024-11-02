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
            var adminPhones = await _context.AdminPhone
                .FromSqlRaw("EXEC sp_GetAllAdminPhones")
                .ToListAsync();

            return _mapper.Map<List<AdminPhoneDTO>>(adminPhones);
        }

        // GET: api/AdminPhone/{admin_id}/Phones
        [HttpGet("{admin_id}/Phones")]
        public async Task<ActionResult<IEnumerable<AdminPhoneDTO>>> GetPhonesByAdminId(int admin_id)
        {
            // Verificar si el Admin existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == admin_id);
            if (!adminExists)
            {
                return NotFound(new { message = $"Admin with Id {admin_id} not found." });
            }

            // Llamada al Stored Procedure
            var adminPhones = await _context.AdminPhone
                .FromSqlRaw("EXEC sp_GetAdminPhonesByAdminId @Admin_id = {0}", admin_id)
                .ToListAsync();

            var adminPhoneDtos = _mapper.Map<List<AdminPhoneDTO>>(adminPhones);

            return Ok(adminPhoneDtos);
        }

        // POST: api/AdminPhone
        [HttpPost]
        public async Task<ActionResult<AdminPhoneDTO>> PostAdminPhone(AdminPhoneDTO adminPhoneDto)
        {
            // Validación
            if (await _context.AdminPhone.AnyAsync(ap => ap.Admin_id == adminPhoneDto.Admin_id && ap.Phone == adminPhoneDto.Phone))
            {
                return Conflict(new { message = $"An AdminPhone with Admin_id {adminPhoneDto.Admin_id} and Phone {adminPhoneDto.Phone} already exists." });
            }

            // Verificar si el Admin_id existe
            var adminExists = await _context.Admin.AnyAsync(a => a.Id == adminPhoneDto.Admin_id);
            if (!adminExists)
            {
                return BadRequest(new { message = $"Admin with Id {adminPhoneDto.Admin_id} does not exist." });
            }

            // Llamada al Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Admin_id", adminPhoneDto.Admin_id),
                new SqlParameter("@Phone", adminPhoneDto.Phone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateAdminPhone @Admin_id, @Phone", parameters);

            // Obtener el adminPhone recién creado
            var adminPhones = await _context.AdminPhone
                .FromSqlRaw("SELECT * FROM [AdminPhone] WHERE [Admin_id] = {0} AND [Phone] = {1}", adminPhoneDto.Admin_id, adminPhoneDto.Phone)
                .ToListAsync();

            var adminPhone = adminPhones.FirstOrDefault();

            var createdAdminPhoneDto = _mapper.Map<AdminPhoneDTO>(adminPhone);

            return CreatedAtAction(nameof(GetPhonesByAdminId), new { admin_id = adminPhone?.Admin_id }, createdAdminPhoneDto);
        }

        // PUT: api/AdminPhone/{admin_id}/{phone}
        [HttpPut("{admin_id}/{phone}")]
        public async Task<IActionResult> PutAdminPhone(int admin_id, int phone, AdminPhoneDTO_Update adminPhoneDtoUpdate)
        {
            // Verificar si la entidad actual existe
            var adminPhoneExists = await _context.AdminPhone
                .AnyAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);

            if (!adminPhoneExists)
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

            // Llamada al Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Admin_id", admin_id),
                new SqlParameter("@OldPhone", phone),
                new SqlParameter("@NewPhone", newPhone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateAdminPhone @Admin_id, @OldPhone, @NewPhone", parameters);

            return NoContent();
        }

        // DELETE: api/AdminPhone/{admin_id}/{phone}
        [HttpDelete("{admin_id}/{phone}")]
        public async Task<IActionResult> DeleteAdminPhone(int admin_id, int phone)
        {
            // Verificar si la entidad actual existe
            var adminPhoneExists = await _context.AdminPhone
                .AnyAsync(ap => ap.Admin_id == admin_id && ap.Phone == phone);

            if (!adminPhoneExists)
            {
                return NotFound(new { message = $"AdminPhone with Admin_id {admin_id} and Phone {phone} not found." });
            }

            // Llamada al Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteAdminPhone @Admin_id = {0}, @Phone = {1}", admin_id, phone);

            return NoContent();
        }
    }
}