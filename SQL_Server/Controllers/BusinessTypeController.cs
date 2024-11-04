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
    public class BusinessTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessTypeController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BusinessType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessTypeDTO>>> GetBusinessTypes()
        {
            var businessTypes = await _context.BusinessType
                .FromSqlRaw("EXEC sp_GetAllBusinessTypes")
                .ToListAsync();

            return _mapper.Map<List<BusinessTypeDTO>>(businessTypes);
        }

        // GET: api/BusinessType/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessTypeDTO>> GetBusinessType(long id)
        {
            var businessTypes = await _context.BusinessType
                .FromSqlRaw("EXEC sp_GetBusinessTypeById @Identification = {0}", id)
                .ToListAsync();

            var businessType = businessTypes.FirstOrDefault();

            if (businessType == null)
            {
                return NotFound(new { message = $"BusinessType with Identification {id} not found." });
            }

            return _mapper.Map<BusinessTypeDTO>(businessType);
        }

        // POST: api/BusinessType
        [HttpPost]
        public async Task<ActionResult<BusinessTypeDTO>> PostBusinessType(BusinessTypeDTO_Create businessTypeDtoCreate)
        {
            // Validation
            if (await _context.BusinessType.AnyAsync(bt => bt.Name == businessTypeDtoCreate.Name))
            {
                return Conflict(new { message = $"The Name '{businessTypeDtoCreate.Name}' is already in use." });
            }

            // Call Stored Procedure (no Identification parameter)
            var parameters = new[]
            {
                new SqlParameter("@Name", businessTypeDtoCreate.Name)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateBusinessType @Name", parameters);

            // Retrieve the newly created BusinessType by Name
            var businessType = await _context.BusinessType
                .FromSqlRaw("SELECT TOP 1 * FROM [BusinessType] WHERE [Name] = {0} ORDER BY [Identification] DESC", businessTypeDtoCreate.Name)
                .FirstOrDefaultAsync();

            var createdBusinessTypeDto = _mapper.Map<BusinessTypeDTO>(businessType);

            return CreatedAtAction(nameof(GetBusinessType), new { id = businessType?.Identification }, createdBusinessTypeDto);
        }

        // PUT: api/BusinessType/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessType(long id, BusinessTypeDTO_Update businessTypeDtoUpdate)
        {
            // Check if BusinessType exists
            var businessTypeExists = await _context.BusinessType.AnyAsync(bt => bt.Identification == id);

            if (!businessTypeExists)
            {
                return NotFound(new { message = $"BusinessType with Identification {id} not found." });
            }

            // Check if new Name is already in use by another BusinessType
            if (await _context.BusinessType.AnyAsync(bt => bt.Name == businessTypeDtoUpdate.Name && bt.Identification != id))
            {
                return Conflict(new { message = $"The Name '{businessTypeDtoUpdate.Name}' is already in use." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Identification", id),
                new SqlParameter("@Name", businessTypeDtoUpdate.Name)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateBusinessType @Identification, @Name", parameters);

            return NoContent();
        }

        // DELETE: api/BusinessType/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessType(long id)
        {
            // Check if BusinessType exists
            var businessTypeExists = await _context.BusinessType.AnyAsync(bt => bt.Identification == id);

            if (!businessTypeExists)
            {
                return NotFound(new { message = $"BusinessType with Identification {id} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteBusinessType @Identification = {0}", id);

            return NoContent();
        }
    }
}