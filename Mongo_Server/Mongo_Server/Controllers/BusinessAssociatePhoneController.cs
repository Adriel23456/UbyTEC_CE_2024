using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessAssociatePhoneController : ControllerBase
    {
        private readonly BusinessAssociatePhoneService _mongoDbService;

        public BusinessAssociatePhoneController(BusinessAssociatePhoneService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/BusinessAssociatePhone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessAssociatePhone>>> GetAllBusinessAssociatesPhones()
        {
            var businessAssociatesPhones = await _mongoDbService.GetAllBusinessAssociatesPhonesAsync();

            if (businessAssociatesPhones == null || !businessAssociatesPhones.Any())
            {
                return NotFound(new { message = "No business associate phones found in the MongoDB database." });
            }

            return Ok(businessAssociatesPhones);
        }

        // GET: api/BusinessAssociatePhone/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessAssociatePhone>> GetBusinessAssociatePhone(string id)
        {
            var businessAssociatePhone = await _mongoDbService.GetBusinessAssociatePhoneByIdAsync(id);
            if (businessAssociatePhone == null)
            {
                return NotFound(new { message = $"Business associate phone with legal Id {id} not found." });
            }

            return Ok(businessAssociatePhone);
        }

        // POST: api/BusinessAssociatePhone
        [HttpPost]
        public async Task<ActionResult<BusinessAssociatePhoneDTO>> PostBussinessAssociatePhone(BusinessAssociatePhoneDTO businessAssociatePhoneDto)
        {
            string idAsString = (businessAssociatePhoneDto.BusinessAssociate_Legal_Id).ToString();
            BusinessAssociatePhone originalBson = await _mongoDbService.GetBusinessAssociatePhoneByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Business associate phone with legal Id '{businessAssociatePhoneDto.BusinessAssociate_Legal_Id}' already exists." });
            }
            
            var newBusinessAssociatePhone = new BusinessAssociatePhone
                {
                    BusinessAssociate_Legal_Id = idAsString,
                    Phone = businessAssociatePhoneDto.Phone
                };

            await _mongoDbService.AddBusinessAssociatePhoneAsync(newBusinessAssociatePhone);

            return CreatedAtAction(nameof(GetBusinessAssociatePhone), new { id = businessAssociatePhoneDto.BusinessAssociate_Legal_Id }, businessAssociatePhoneDto);
        }

        // PUT: api/BussinessAssociate/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessAssociatePhone(long id, BusinessAssociatePhoneDTO businessAssociatePhoneDtoUpdate)
        {
            string idAsString = id.ToString();
            BusinessAssociatePhone originalBson = await _mongoDbService.GetBusinessAssociatePhoneByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business associate phonewith Id '{id}' not found." });
            }

            originalBson.Phone = businessAssociatePhoneDtoUpdate.Phone;

            await _mongoDbService.UpdateBusinessAssociatePhoneAsync(id, originalBson);

            return NoContent();
        }


        // DELETE: api/BusinessAssociatePhone/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessAssociatePhone(int id)
        {
            string idAsString = id.ToString();
            BusinessAssociatePhone originalBson = await _mongoDbService.GetBusinessAssociatePhoneByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business Associate phone with legal Id '{id}' not found." });
            }
            //Delete from mongo db
            await _mongoDbService.DeleteBusinessAssociatePhoneAsync(id);

            return NoContent();
        }
    }
}