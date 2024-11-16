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
    public class BusinessManagerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public BusinessManagerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/BusinessManager
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessManagerDTO>>> GetBusinessManagers()
        {
            var businessManagers = await _context.BusinessManager
                .FromSqlRaw("EXEC sp_GetAllBusinessManagers")
                .ToListAsync();

            return _mapper.Map<List<BusinessManagerDTO>>(businessManagers);
        }

        // GET: api/BusinessManager/{email}
        [HttpGet("{email}")]
        public async Task<ActionResult<BusinessManagerDTO>> GetBusinessManager(string email)
        {
            var businessManagers = await _context.BusinessManager
                .FromSqlRaw("EXEC sp_GetBusinessManagerByEmail @Email = {0}", email)
                .ToListAsync();

            var businessManager = businessManagers.FirstOrDefault();

            if (businessManager == null)
            {
                return NotFound(new { message = $"BusinessManager with Email {email} not found." });
            }

            return _mapper.Map<BusinessManagerDTO>(businessManager);
        }

        // POST: api/BusinessManager
        [HttpPost]
        public async Task<ActionResult<BusinessManagerDTO>> PostBusinessManager(BusinessManagerDTO_Create businessManagerDtoCreate)
        {
            // Validation
            if (await _context.BusinessManager.AnyAsync(bm => bm.Email == businessManagerDtoCreate.Email))
            {
                return Conflict(new { message = $"A BusinessManager with Email {businessManagerDtoCreate.Email} already exists." });
            }

            if (await _context.BusinessManager.AnyAsync(bm => bm.UserId == businessManagerDtoCreate.UserId))
            {
                return Conflict(new { message = $"The UserId '{businessManagerDtoCreate.UserId}' is already in use." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Email", businessManagerDtoCreate.Email),
                new SqlParameter("@Name", businessManagerDtoCreate.Name),
                new SqlParameter("@FirstSurname", businessManagerDtoCreate.FirstSurname),
                new SqlParameter("@SecondSurname", businessManagerDtoCreate.SecondSurname),
                new SqlParameter("@Province", businessManagerDtoCreate.Province),
                new SqlParameter("@Canton", businessManagerDtoCreate.Canton),
                new SqlParameter("@District", businessManagerDtoCreate.District),
                new SqlParameter("@UserId", businessManagerDtoCreate.UserId),
                new SqlParameter("@Password", businessManagerDtoCreate.Password)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateBusinessManager @Email, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password", parameters);

            // Get the newly created BusinessManager
            var businessManagers = await _context.BusinessManager
                .FromSqlRaw("EXEC sp_GetBusinessManagerByEmail @Email = {0}", businessManagerDtoCreate.Email)
                .ToListAsync();

            var businessManager = businessManagers.FirstOrDefault();

            var createdBusinessManagerDto = _mapper.Map<BusinessManagerDTO>(businessManager);

            return CreatedAtAction(nameof(GetBusinessManager), new { email = businessManager?.Email }, createdBusinessManagerDto);
        }

        // PUT: api/BusinessManager/{email}
        [HttpPut("{email}")]
        public async Task<IActionResult> PutBusinessManager(string email, BusinessManagerDTO_Update businessManagerDtoUpdate)
        {
            // Check if the BusinessManager exists
            var businessManagerExists = await _context.BusinessManager.AnyAsync(bm => bm.Email == email);

            if (!businessManagerExists)
            {
                return NotFound(new { message = $"BusinessManager with Email {email} not found." });
            }

            // Check if the new UserId is already in use by another BusinessManager
            if (await _context.BusinessManager.AnyAsync(bm => bm.UserId == businessManagerDtoUpdate.UserId && bm.Email != email))
            {
                return Conflict(new { message = $"The UserId '{businessManagerDtoUpdate.UserId}' is already in use." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Email", email),
                new SqlParameter("@Name", businessManagerDtoUpdate.Name),
                new SqlParameter("@FirstSurname", businessManagerDtoUpdate.FirstSurname),
                new SqlParameter("@SecondSurname", businessManagerDtoUpdate.SecondSurname),
                new SqlParameter("@Province", businessManagerDtoUpdate.Province),
                new SqlParameter("@Canton", businessManagerDtoUpdate.Canton),
                new SqlParameter("@District", businessManagerDtoUpdate.District),
                new SqlParameter("@UserId", businessManagerDtoUpdate.UserId),
                new SqlParameter("@Password", businessManagerDtoUpdate.Password)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateBusinessManager @Email, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @UserId, @Password", parameters);

            return NoContent();
        }

        // DELETE: api/BusinessManager/{email}
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteBusinessManager(string email)
        {
            // Check if the BusinessManager exists
            var businessManagerExists = await _context.BusinessManager.AnyAsync(bm => bm.Email == email);

            if (!businessManagerExists)
            {
                return NotFound(new { message = $"BusinessManager with Email {email} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteBusinessManager @Email = {0}", email);

            return NoContent();
        }

        // POST: api/BusinessManager/Authenticate
        [HttpPost("Authenticate")]
        public async Task<ActionResult<BusinessManagerDTO_AuthResponse>> Authenticate(BusinessManagerDTO_Login loginDto)
        {
            // Authenticate BusinessManager
            var parameters = new[]
            {
                new SqlParameter("@Email", loginDto.Email),
                new SqlParameter("@Password", loginDto.Password)
            };

            var businessManagers = await _context.BusinessManager
                .FromSqlRaw("EXEC sp_AuthenticateBusinessManager @Email, @Password", parameters)
                .ToListAsync();

            var businessManager = businessManagers.FirstOrDefault();

            if (businessManager == null)
            {
                // Check if Email exists
                var emailExists = await _context.BusinessManager.AnyAsync(bm => bm.Email == loginDto.Email);
                if (!emailExists)
                {
                    return NotFound(new { message = $"Email '{loginDto.Email}' not found." });
                }
                else
                {
                    return Unauthorized(new { message = "Incorrect password." });
                }
            }

            // Get associated BusinessAssociate
            var associateParameters = new[]
            {
                new SqlParameter("@BusinessManager_Email", businessManager.Email)
            };

            var businessAssociates = await _context.BusinessAssociate
                .FromSqlRaw("EXEC sp_GetBusinessAssociateByManagerEmail @BusinessManager_Email", associateParameters)
                .ToListAsync();

            var businessAssociate = businessAssociates.FirstOrDefault();

            if (businessAssociate == null)
            {
                return Unauthorized(new { message = "No BusinessAssociate associated with this BusinessManager." });
            }

            // Check if BusinessAssociate's State is 'Aceptado'
            if (businessAssociate.State != "Aceptado")
            {
                return Unauthorized(new { message = $"BusinessAssociate is not in 'Aceptado' state. Current state: '{businessAssociate.State}'." });
            }

            var responseDto = new BusinessManagerDTO_AuthResponse
            {
                BusinessManager = _mapper.Map<BusinessManagerDTO>(businessManager),
                BusinessAssociate = _mapper.Map<BusinessAssociateDTO>(businessAssociate)
            };

            return Ok(responseDto);
        }
    }
}