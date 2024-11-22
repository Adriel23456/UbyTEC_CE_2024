using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _mongoDbService;

        public ClientController(ClientService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/Client
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            var clients = await _mongoDbService.GetAllClientAsync();

            if (clients == null || !clients.Any())
            {
                return NotFound(new { message = "No clients found in the MongoDB database." });
            }

            return Ok(clients);
        }

        // GET: api/Client/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClientById(long id)
        {
            string idAsString = id.ToString();
            var client = await _mongoDbService.GetClientByIdAsync(idAsString);
            if (client == null)
            {
                return NotFound(new { message = $"Client with Id {idAsString} not found." });
            }

            return Ok(client);
        }

        // POST: api/Client
        [HttpPost]
        public async Task<ActionResult<ClientDTO>> PostClient(ClientDTO clientDto)
        {
            string idAsString = clientDto.Id.ToString();

            var originalBson = await _mongoDbService.GetClientByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Client with Id '{idAsString}' already exists." });
            }

            var newClient = new Client
            {
                Id = clientDto.Id.ToString(),
                UserId = clientDto.UserId,
                Name = clientDto.Name,
                FirstSurname = clientDto.FirstSurname,
                SecondSurname = clientDto.SecondSurname,
                FullName = clientDto.FullName,
                Province = clientDto.Province,
                Canton = clientDto.Canton,
                District = clientDto.District,
                Direction = clientDto.Direction,
                Password = clientDto.Password,
                Phone = clientDto.Phone,
                BirthDate = clientDto.BirthDate
            };

            await _mongoDbService.AddClientAsync(newClient);

            return CreatedAtAction(nameof(GetClientById), new { id = clientDto.Id }, clientDto);
        }

        // PUT: api/Client/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(long id, ClientDTO clientDtoUpdate)
        {
            string idAsString = id.ToString();

            var originalBson = await _mongoDbService.GetClientByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Client with Id '{idAsString}' not found." });
            }

            originalBson.UserId = clientDtoUpdate.UserId;
            originalBson.Name = clientDtoUpdate.Name;
            originalBson.FirstSurname = clientDtoUpdate.FirstSurname;
            originalBson.SecondSurname = clientDtoUpdate.SecondSurname;
            originalBson.FullName = clientDtoUpdate.FullName;
            originalBson.Province = clientDtoUpdate.Province;
            originalBson.Canton = clientDtoUpdate.Canton;
            originalBson.District = clientDtoUpdate.District;
            originalBson.Direction = clientDtoUpdate.Direction;
            originalBson.Password = clientDtoUpdate.Password;
            originalBson.Phone = clientDtoUpdate.Phone;
            originalBson.BirthDate = clientDtoUpdate.BirthDate;

            await _mongoDbService.UpdateClientAsync(idAsString, originalBson);

            return NoContent();
        }

        // DELETE: api/Client/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(long id)
        {
            string idAsString = id.ToString();

            var originalBson = await _mongoDbService.GetClientByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Client with Id '{idAsString}' not found." });
            }

            await _mongoDbService.DeleteClientAsync(idAsString);

            return NoContent();
        }
    }
}
