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
    public class BusinessAssociatePhoneController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessAssociatePhoneController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BusinessAssociatePhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessAssociatePhoneDTO>>> GetBusinessAssociatePhones()
        {
            var phones = await _context.BusinessAssociatePhone
                .FromSqlRaw("EXEC sp_GetAllBusinessAssociatePhones")
                .ToListAsync();

            return _mapper.Map<List<BusinessAssociatePhoneDTO>>(phones);
        }

        // GET: api/BusinessAssociatePhone/{legal_id}/Phones
        [HttpGet("{legal_id}/Phones")]
        public async Task<ActionResult<IEnumerable<BusinessAssociatePhoneDTO>>> GetPhonesByLegalId(long legal_id)
        {
            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == legal_id);
            if (!businessAssociateExists)
            {
                return NotFound(new { message = $"BusinessAssociate with Legal_Id {legal_id} not found." });
            }

            // Call Stored Procedure
            var phones = await _context.BusinessAssociatePhone
                .FromSqlRaw("EXEC sp_GetBusinessAssociatePhonesByLegalId @BusinessAssociate_Legal_Id = {0}", legal_id)
                .ToListAsync();

            var phoneDtos = _mapper.Map<List<BusinessAssociatePhoneDTO>>(phones);

            return Ok(phoneDtos);
        }

        // POST: api/BusinessAssociatePhone
        [HttpPost]
        public async Task<ActionResult<BusinessAssociatePhoneDTO>> PostBusinessAssociatePhone(BusinessAssociatePhoneDTO phoneDto)
        {
            // Validation
            if (await _context.BusinessAssociatePhone.AnyAsync(bap => bap.BusinessAssociate_Legal_Id == phoneDto.BusinessAssociate_Legal_Id && bap.Phone == phoneDto.Phone))
            {
                return Conflict(new { message = $"A BusinessAssociatePhone with Legal_Id {phoneDto.BusinessAssociate_Legal_Id} and Phone {phoneDto.Phone} already exists." });
            }

            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == phoneDto.BusinessAssociate_Legal_Id);
            if (!businessAssociateExists)
            {
                return BadRequest(new { message = $"BusinessAssociate with Legal_Id {phoneDto.BusinessAssociate_Legal_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@BusinessAssociate_Legal_Id", phoneDto.BusinessAssociate_Legal_Id),
                new SqlParameter("@Phone", phoneDto.Phone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateBusinessAssociatePhone @BusinessAssociate_Legal_Id, @Phone", parameters);

            // Retrieve the newly created phone
            var phones = await _context.BusinessAssociatePhone
                .FromSqlRaw("SELECT * FROM [BusinessAssociatePhone] WHERE [BusinessAssociate_Legal_Id] = {0} AND [Phone] = {1}", phoneDto.BusinessAssociate_Legal_Id, phoneDto.Phone)
                .ToListAsync();

            var phone = phones.FirstOrDefault();

            var createdPhoneDto = _mapper.Map<BusinessAssociatePhoneDTO>(phone);

            return CreatedAtAction(nameof(GetPhonesByLegalId), new { legal_id = phone?.BusinessAssociate_Legal_Id }, createdPhoneDto);
        }

        // PUT: api/BusinessAssociatePhone/{legal_id}/{phone}
        [HttpPut("{legal_id}/{phone}")]
        public async Task<IActionResult> PutBusinessAssociatePhone(long legal_id, long phone, BusinessAssociatePhoneDTO_Update phoneDtoUpdate)
        {
            // Check if the current entity exists
            var phoneExists = await _context.BusinessAssociatePhone.AnyAsync(bap => bap.BusinessAssociate_Legal_Id == legal_id && bap.Phone == phone);

            if (!phoneExists)
            {
                return NotFound(new { message = $"BusinessAssociatePhone with Legal_Id {legal_id} and Phone {phone} not found." });
            }

            long newPhone = phoneDtoUpdate.Phone;

            // If the new phone is the same as the old one, nothing to update
            if (newPhone == phone)
            {
                return NoContent();
            }

            // Check if the new phone already exists for the same BusinessAssociate
            if (await _context.BusinessAssociatePhone.AnyAsync(bap => bap.BusinessAssociate_Legal_Id == legal_id && bap.Phone == newPhone))
            {
                return Conflict(new { message = $"A BusinessAssociatePhone with Legal_Id {legal_id} and Phone {newPhone} already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@BusinessAssociate_Legal_Id", legal_id),
                new SqlParameter("@OldPhone", phone),
                new SqlParameter("@NewPhone", newPhone)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateBusinessAssociatePhone @BusinessAssociate_Legal_Id, @OldPhone, @NewPhone", parameters);

            return NoContent();
        }

        // DELETE: api/BusinessAssociatePhone/{legal_id}/{phone}
        [HttpDelete("{legal_id}/{phone}")]
        public async Task<IActionResult> DeleteBusinessAssociatePhone(long legal_id, long phone)
        {
            // Check if the entity exists
            var phoneExists = await _context.BusinessAssociatePhone.AnyAsync(bap => bap.BusinessAssociate_Legal_Id == legal_id && bap.Phone == phone);

            if (!phoneExists)
            {
                return NotFound(new { message = $"BusinessAssociatePhone with Legal_Id {legal_id} and Phone {phone} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteBusinessAssociatePhone @BusinessAssociate_Legal_Id = {0}, @Phone = {1}", legal_id, phone);

            return NoContent();
        }
    }
}