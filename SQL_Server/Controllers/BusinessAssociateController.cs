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
    public class BusinessAssociateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessAssociateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BusinessAssociate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessAssociateDTO>>> GetBusinessAssociates()
        {
            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("EXEC sp_GetAllBusinessAssociates")
                .ToListAsync();

            return _mapper.Map<List<BusinessAssociateDTO>>(businessAssociates);
        }

        // GET: api/BusinessAssociate/{legal_id}
        [HttpGet("{legal_id}")]
        public async Task<ActionResult<BusinessAssociateDTO>> GetBusinessAssociate(int legal_id)
        {
            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("EXEC sp_GetBusinessAssociateById @Legal_Id = {0}", legal_id)
                .ToListAsync();

            var businessAssociate = businessAssociates.FirstOrDefault();

            if (businessAssociate == null)
            {
                return NotFound(new { message = $"BusinessAssociate with Legal_Id {legal_id} not found." });
            }

            return _mapper.Map<BusinessAssociateDTO>(businessAssociate);
        }

        // POST: api/BusinessAssociate
        [HttpPost]
        public async Task<ActionResult<BusinessAssociateDTO>> PostBusinessAssociate(BusinessAssociateDTO_Create businessAssociateDtoCreate)
        {
            // Validations
            if (await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == businessAssociateDtoCreate.Legal_Id))
            {
                return Conflict(new { message = $"A BusinessAssociate with Legal_Id {businessAssociateDtoCreate.Legal_Id} already exists." });
            }

            if (await _context.BusinessManager.AnyAsync(bm => bm.Email == businessAssociateDtoCreate.BusinessManager_Email) == false)
            {
                return BadRequest(new { message = $"BusinessManager with Email '{businessAssociateDtoCreate.BusinessManager_Email}' does not exist." });
            }

            if (await _context.BusinessType.AnyAsync(bt => bt.Identification == businessAssociateDtoCreate.BusinessType_Identification) == false)
            {
                return BadRequest(new { message = $"BusinessType with Identification {businessAssociateDtoCreate.BusinessType_Identification} does not exist." });
            }

            // Validate State
            if (!new[] { "Aceptado", "En espera", "Rechazado" }.Contains(businessAssociateDtoCreate.State))
            {
                return BadRequest(new { message = "State must be 'Aceptado', 'En espera', or 'Rechazado'." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Legal_Id", businessAssociateDtoCreate.Legal_Id),
                new SqlParameter("@Email", businessAssociateDtoCreate.Email),
                new SqlParameter("@State", businessAssociateDtoCreate.State),
                new SqlParameter("@BusinessName", businessAssociateDtoCreate.BusinessName),
                new SqlParameter("@Province", businessAssociateDtoCreate.Province),
                new SqlParameter("@Canton", businessAssociateDtoCreate.Canton),
                new SqlParameter("@District", businessAssociateDtoCreate.District),
                new SqlParameter("@SINPE", businessAssociateDtoCreate.SINPE),
                new SqlParameter("@BusinessManager_Email", businessAssociateDtoCreate.BusinessManager_Email),
                new SqlParameter("@BusinessType_Identification", businessAssociateDtoCreate.BusinessType_Identification)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateBusinessAssociate @Legal_Id, @Email, @State, @BusinessName, @Province, @Canton, @District, @SINPE, @BusinessManager_Email, @BusinessType_Identification", parameters);

            // Retrieve the newly created BusinessAssociate
            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("EXEC sp_GetBusinessAssociateById @Legal_Id = {0}", businessAssociateDtoCreate.Legal_Id)
                .ToListAsync();

            var businessAssociate = businessAssociates.FirstOrDefault();

            var createdBusinessAssociateDto = _mapper.Map<BusinessAssociateDTO>(businessAssociate);

            return CreatedAtAction(nameof(GetBusinessAssociate), new { legal_id = businessAssociate?.Legal_Id }, createdBusinessAssociateDto);
        }

        // PUT: api/BusinessAssociate/{legal_id}
        [HttpPut("{legal_id}")]
        public async Task<IActionResult> PutBusinessAssociate(int legal_id, BusinessAssociateDTO_Update businessAssociateDtoUpdate)
        {
            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == legal_id);

            if (!businessAssociateExists)
            {
                return NotFound(new { message = $"BusinessAssociate with Legal_Id {legal_id} not found." });
            }

            // Check if BusinessManager exists
            if (await _context.BusinessManager.AnyAsync(bm => bm.Email == businessAssociateDtoUpdate.BusinessManager_Email) == false)
            {
                return BadRequest(new { message = $"BusinessManager with Email '{businessAssociateDtoUpdate.BusinessManager_Email}' does not exist." });
            }

            // Check if BusinessType exists
            if (await _context.BusinessType.AnyAsync(bt => bt.Identification == businessAssociateDtoUpdate.BusinessType_Identification) == false)
            {
                return BadRequest(new { message = $"BusinessType with Identification {businessAssociateDtoUpdate.BusinessType_Identification} does not exist." });
            }

            // Validate State
            if (!new[] { "Aceptado", "En espera", "Rechazado" }.Contains(businessAssociateDtoUpdate.State))
            {
                return BadRequest(new { message = "State must be 'Aceptado', 'En espera', or 'Rechazado'." });
            }

            // Call Stored Procedure
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
            var parameters = new[]
            {
                new SqlParameter("@Legal_Id", legal_id),
                new SqlParameter("@Email", businessAssociateDtoUpdate.Email),
                new SqlParameter("@State", businessAssociateDtoUpdate.State),
                new SqlParameter("@BusinessName", businessAssociateDtoUpdate.BusinessName),
                new SqlParameter("@Province", businessAssociateDtoUpdate.Province),
                new SqlParameter("@Canton", businessAssociateDtoUpdate.Canton),
                new SqlParameter("@District", businessAssociateDtoUpdate.District),
                new SqlParameter("@SINPE", businessAssociateDtoUpdate.SINPE),
                new SqlParameter("@RejectReason", (object)businessAssociateDtoUpdate.RejectReason ?? DBNull.Value),
                new SqlParameter("@BusinessManager_Email", businessAssociateDtoUpdate.BusinessManager_Email),
                new SqlParameter("@BusinessType_Identification", businessAssociateDtoUpdate.BusinessType_Identification)
            };
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateBusinessAssociate @Legal_Id, @Email, @State, @BusinessName, @Province, @Canton, @District, @SINPE, @RejectReason, @BusinessManager_Email, @BusinessType_Identification", parameters);

            return NoContent();
        }

        // DELETE: api/BusinessAssociate/{legal_id}
        [HttpDelete("{legal_id}")]
        public async Task<IActionResult> DeleteBusinessAssociate(int legal_id)
        {
            // Check if BusinessAssociate exists
            var businessAssociateExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == legal_id);

            if (!businessAssociateExists)
            {
                return NotFound(new { message = $"BusinessAssociate with Legal_Id {legal_id} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteBusinessAssociate @Legal_Id = {0}", legal_id);

            return NoContent();
        }
    }
}