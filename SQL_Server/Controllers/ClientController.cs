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
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ClientController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Client
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClients()
        {
            var clients = await _context.Client
                .FromSqlRaw("EXEC sp_GetAllClients")
                .ToListAsync();

            return _mapper.Map<List<ClientDTO>>(clients);
        }

        // GET: api/Client/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDTO>> GetClient(long id) // Changed id type to int
        {
            var clients = await _context.Client
                .FromSqlRaw("EXEC sp_GetClientById @Id = {0}", id)
                .ToListAsync();

            var client = clients.FirstOrDefault();

            if (client == null)
            {
                return NotFound(new { message = $"Client with Id {id} not found." });
            }

            return _mapper.Map<ClientDTO>(client);
        }

        // POST: api/Client
        [HttpPost]
        public async Task<ActionResult<ClientDTO>> PostClient(ClientDTO_Create clientDtoCreate)
        {
            // Validations
            if (await _context.Client.AnyAsync(c => c.Id == clientDtoCreate.Id))
            {
                return Conflict(new { message = $"A Client with Id {clientDtoCreate.Id} already exists." });
            }

            if (await _context.Client.AnyAsync(c => c.UserId == clientDtoCreate.UserId))
            {
                return Conflict(new { message = $"The UserId '{clientDtoCreate.UserId}' is already in use." });
            }

            // Validate BirthDate format
            if (!System.Text.RegularExpressions.Regex.IsMatch(clientDtoCreate.BirthDate, @"^\d{2}-\d{2}-\d{4}$"))
            {
                return BadRequest(new { message = "BirthDate must be in the format dd-mm-yyyy." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Id", clientDtoCreate.Id),
                new SqlParameter("@UserId", clientDtoCreate.UserId),
                new SqlParameter("@Name", clientDtoCreate.Name),
                new SqlParameter("@FirstSurname", clientDtoCreate.FirstSurname),
                new SqlParameter("@SecondSurname", clientDtoCreate.SecondSurname),
                new SqlParameter("@Province", clientDtoCreate.Province),
                new SqlParameter("@Canton", clientDtoCreate.Canton),
                new SqlParameter("@District", clientDtoCreate.District),
                new SqlParameter("@Password", clientDtoCreate.Password),
                new SqlParameter("@Phone", clientDtoCreate.Phone),
                new SqlParameter("@BirthDate", clientDtoCreate.BirthDate)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateClient @Id, @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @Phone, @BirthDate", parameters);

            var clients = await _context.Client
                .FromSqlRaw("EXEC sp_GetClientById @Id = {0}", clientDtoCreate.Id)
                .ToListAsync();

            var client = clients.FirstOrDefault();

            var createdClientDto = _mapper.Map<ClientDTO>(client);

            return CreatedAtAction(nameof(GetClient), new { id = client?.Id }, createdClientDto);
        }

        // PUT: api/Client/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(long id, ClientDTO_Update clientDtoUpdate)
        {
            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == id);

            if (!clientExists)
            {
                return NotFound(new { message = $"Client with Id {id} not found." });
            }

            // Check if new UserId is already in use by another Client
            if (await _context.Client.AnyAsync(c => c.UserId == clientDtoUpdate.UserId && c.Id != id))
            {
                return Conflict(new { message = $"The UserId '{clientDtoUpdate.UserId}' is already in use." });
            }

            // Validate BirthDate format
            if (!System.Text.RegularExpressions.Regex.IsMatch(clientDtoUpdate.BirthDate, @"^\d{2}-\d{2}-\d{4}$"))
            {
                return BadRequest(new { message = "BirthDate must be in the format dd-mm-yyyy." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Id", id),
                new SqlParameter("@UserId", clientDtoUpdate.UserId),
                new SqlParameter("@Name", clientDtoUpdate.Name),
                new SqlParameter("@FirstSurname", clientDtoUpdate.FirstSurname),
                new SqlParameter("@SecondSurname", clientDtoUpdate.SecondSurname),
                new SqlParameter("@Province", clientDtoUpdate.Province),
                new SqlParameter("@Canton", clientDtoUpdate.Canton),
                new SqlParameter("@District", clientDtoUpdate.District),
                new SqlParameter("@Password", clientDtoUpdate.Password),
                new SqlParameter("@Phone", clientDtoUpdate.Phone),
                new SqlParameter("@BirthDate", clientDtoUpdate.BirthDate)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateClient @Id, @UserId, @Name, @FirstSurname, @SecondSurname, @Province, @Canton, @District, @Password, @Phone, @BirthDate", parameters);

            return NoContent();
        }

        // DELETE: api/Client/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(long id) // Changed id type to int
        {
            // Check if Client exists
            var clientExists = await _context.Client.AnyAsync(c => c.Id == id);

            if (!clientExists)
            {
                return NotFound(new { message = $"Client with Id {id} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteClient @Id = {0}", id);

            return NoContent();
        }

        // POST: api/Client/Authenticate
        [HttpPost("Authenticate")]
        public async Task<ActionResult<ClientDTO>> Authenticate(ClientDTO_Login loginDto)
        {
            // Call the stored procedure
            var parameters = new[]
            {
                new SqlParameter("@UserId", loginDto.UserId),
                new SqlParameter("@Password", loginDto.Password)
            };

            var clients = await _context.Client
                .FromSqlRaw("EXEC sp_AuthenticateClient @UserId, @Password", parameters)
                .ToListAsync();

            var client = clients.FirstOrDefault();

            if (client == null)
            {
                // Check if UserId exists
                var userIdExists = await _context.Client.AnyAsync(c => c.UserId == loginDto.UserId);
                if (!userIdExists)
                {
                    return NotFound(new { message = $"UserId '{loginDto.UserId}' not found." });
                }
                else
                {
                    return Unauthorized(new { message = "Incorrect password." });
                }
            }

            var clientDto = _mapper.Map<ClientDTO>(client);

            return Ok(clientDto);
        }
    }
}