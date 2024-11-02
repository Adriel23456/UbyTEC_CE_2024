using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessManagerPhoneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessManagerPhoneController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BusinessManagerPhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessManagerPhoneDTO>>> GetBusinessManagerPhones()
        {
            var businessManagerPhones = await _context.BusinessManagerPhone
                .FromSqlRaw("EXEC sp_GetAllBusinessManagerPhones")
                .ToListAsync();

            return _mapper.Map<List<BusinessManagerPhoneDTO>>(businessManagerPhones);
        }

        // GET: api/BusinessManagerPhone/{email}/Phones
        [HttpGet("{email}/Phones")]
        public async Task<ActionResult<IEnumerable<BusinessManagerPhoneDTO>>> GetPhonesByEmail(string email)
        {
            // Check if the BusinessManager exists
            var businessManagerExists = await _context.BusinessManager.AnyAsync(bm => bm.Email == email);
            if (!businessManagerExists)
            {
                return NotFound(new { message = $"BusinessManager with Email {email} not found." });
            }

            // Call Stored Procedure
            var businessManagerPhones = await _context.BusinessManagerPhone
                .FromSqlRaw("EXEC sp_GetBusinessManagerPhonesByEmail @BusinessManager_Email = {0}", email)
                .ToListAsync();

            var businessManagerPhoneDtos = _mapper.Map<List<BusinessManagerPhoneDTO>>(businessManagerPhones);

            return Ok(businessManagerPhoneDtos);
        }

        // POST: api/BusinessManagerPhone
        [HttpPost]
        public async Task<ActionResult<BusinessManagerPhoneDTO>> PostBusinessManagerPhone(BusinessManagerPhoneDTO businessManagerPhoneDto)
        {
            // Validation
            if (await _context.BusinessManagerPhone.AnyAsync(bmp => bmp.BusinessManager_Email == businessManagerPhoneDto.BusinessManager_Email && bmp.Phone == businessManagerPhoneDto.Phone))
            {
                return Conflict(new { message = $"A BusinessManagerPhone with BusinessManager_Email {businessManagerPhoneDto.BusinessManager_Email} and Phone {businessManagerPhoneDto.Phone} already exists." });
            }

            // Check if the BusinessManager_Email exists
            var businessManagerExists = await _context.BusinessManager.AnyAsync(bm => bm.Email == businessManagerPhoneDto.BusinessManager_Email);
            if (!businessManagerExists)
            {
                return BadRequest(new { message = $"BusinessManager with Email {businessManagerPhoneDto.BusinessManager_Email} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@BusinessManager_Email", businessManagerPhoneDto.BusinessManager_Email),
                new SqlParameter("@Phone", businessManagerPhoneDto.Phone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateBusinessManagerPhone @BusinessManager_Email, @Phone", parameters);

            // Get the newly created BusinessManagerPhone
            var businessManagerPhones = await _context.BusinessManagerPhone
                .FromSqlRaw("SELECT * FROM [BusinessManagerPhone] WHERE [BusinessManager_Email] = {0} AND [Phone] = {1}", businessManagerPhoneDto.BusinessManager_Email, businessManagerPhoneDto.Phone)
                .ToListAsync();

            var businessManagerPhone = businessManagerPhones.FirstOrDefault();

            var createdBusinessManagerPhoneDto = _mapper.Map<BusinessManagerPhoneDTO>(businessManagerPhone);

            return CreatedAtAction(nameof(GetPhonesByEmail), new { email = businessManagerPhone?.BusinessManager_Email }, createdBusinessManagerPhoneDto);
        }

        // PUT: api/BusinessManagerPhone/{email}/{phone}
        [HttpPut("{email}/{phone}")]
        public async Task<IActionResult> PutBusinessManagerPhone(string email, int phone, BusinessManagerPhoneDTO_Update businessManagerPhoneDtoUpdate)
        {
            // Check if the current entity exists
            var businessManagerPhoneExists = await _context.BusinessManagerPhone
                .AnyAsync(bmp => bmp.BusinessManager_Email == email && bmp.Phone == phone);

            if (!businessManagerPhoneExists)
            {
                return NotFound(new { message = $"BusinessManagerPhone with BusinessManager_Email {email} and Phone {phone} not found." });
            }

            int newPhone = businessManagerPhoneDtoUpdate.Phone;

            // If the new phone is the same as the existing, nothing to update
            if (newPhone == phone)
            {
                return NoContent();
            }

            // Check if there is already an entity with the new phone for the same BusinessManager_Email
            if (await _context.BusinessManagerPhone.AnyAsync(bmp => bmp.BusinessManager_Email == email && bmp.Phone == newPhone))
            {
                return Conflict(new { message = $"A BusinessManagerPhone with BusinessManager_Email {email} and Phone {newPhone} already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@BusinessManager_Email", email),
                new SqlParameter("@OldPhone", phone),
                new SqlParameter("@NewPhone", newPhone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateBusinessManagerPhone @BusinessManager_Email, @OldPhone, @NewPhone", parameters);

            return NoContent();
        }

        // DELETE: api/BusinessManagerPhone/{email}/{phone}
        [HttpDelete("{email}/{phone}")]
        public async Task<IActionResult> DeleteBusinessManagerPhone(string email, int phone)
        {
            // Check if the entity exists
            var businessManagerPhoneExists = await _context.BusinessManagerPhone
                .AnyAsync(bmp => bmp.BusinessManager_Email == email && bmp.Phone == phone);

            if (!businessManagerPhoneExists)
            {
                return NotFound(new { message = $"BusinessManagerPhone with BusinessManager_Email {email} and Phone {phone} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteBusinessManagerPhone @BusinessManager_Email = {0}, @Phone = {1}", email, phone);

            return NoContent();
        }
    }
}