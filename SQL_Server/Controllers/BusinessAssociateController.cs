using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessAssociateController : ControllerBase
    {
        private readonly BusinessAssociateService _mongoDbService;

        public BusinessAssociateController(BusinessAssociateService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/BusinessAssociate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessAssociate>>> GetAllBusinessAssociates()
        {
            var businessAssociates = await _mongoDbService.GetAllBusinessAssociatesAsync();

            if (businessAssociates == null || !businessAssociates.Any())
            {
                return NotFound(new { message = "No business associates found in the MongoDB database." });
            }

            return Ok(businessAssociates);
        }

        // GET: api/BusinessAssociate/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessAssociate>> GetBusinessAssociate(string id)
        {
            var bussinessAssociate = await _mongoDbService.GetBusinessAssociateByIdAsync(id);
            if (bussinessAssociate == null)
            {
                return NotFound(new { message = $"Business associate with Id {id} not found." });
            }

            return Ok(bussinessAssociate);
        }

        // POST: api/BusinessAssociate
        [HttpPost]
        public async Task<ActionResult<BusinessAssociateDTO>> PostBussinessAssociate(BusinessAssociateDTO businessAssociateDto)
        {
            string idAsString = (businessAssociateDto.Legal_Id).ToString();
            BusinessAssociate originalBson = await _mongoDbService.GetBusinessAssociateByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Business associate with legal Id '{businessAssociateDto.Legal_Id}' already exists." });
            }
            
            var newBusinessAssociate = new BusinessAssociate
                {
                    Legal_Id = idAsString,
                    Email = businessAssociateDto.Email,
                    State = businessAssociateDto.State,
                    BusinessName = businessAssociateDto.BusinessName,
                    Direction = businessAssociateDto.Direction,
                    Province = businessAssociateDto.Province,
                    Canton = businessAssociateDto.Canton,
                    District = businessAssociateDto.District,
                    SINPE = businessAssociateDto.SINPE,
                    RejectReason = businessAssociateDto.RejectReason,
                    BusinessManager_Email = businessAssociateDto.BusinessManager_Email,
                    BusinessType_Identification = businessAssociateDto.BusinessType_Identification
                };

            await _mongoDbService.AddBusinessAssociateAsync(newBusinessAssociate);

            return CreatedAtAction(nameof(GetBusinessAssociate), new { id = businessAssociateDto.Legal_Id }, businessAssociateDto);
        }

        // PUT: api/BussinessAssociate/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessAssociate(long id, BusinessAssociateDTO businessAssociateDtoUpdate)
        {
            string idAsString = id.ToString();
            BusinessAssociate originalBson = await _mongoDbService.GetBusinessAssociateByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business associate with Id '{id}' not found." });
            }

            originalBson.Email = businessAssociateDtoUpdate.Email;
            originalBson.State = businessAssociateDtoUpdate.State;
            originalBson.BusinessName = businessAssociateDtoUpdate.BusinessName;
            originalBson.Direction = businessAssociateDtoUpdate.Direction;
            originalBson.Province = businessAssociateDtoUpdate.Province;
            originalBson.Canton = businessAssociateDtoUpdate.Canton;
            originalBson.District = businessAssociateDtoUpdate.District;
            originalBson.SINPE = businessAssociateDtoUpdate.SINPE;
            originalBson.RejectReason = businessAssociateDtoUpdate.RejectReason;
            originalBson.BusinessManager_Email = businessAssociateDtoUpdate.BusinessManager_Email;
            originalBson.BusinessType_Identification = businessAssociateDtoUpdate.BusinessType_Identification;


            await _mongoDbService.UpdateBusinessAssociateAsync(id, originalBson);

            return NoContent();
        }


        // DELETE: api/BusinessAssociate/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessAssociate(int id)
        {
            string idAsString = id.ToString();
            BusinessAssociate originalBson = await _mongoDbService.GetBusinessAssociateByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Business Associate with legal Id '{id}' not found." });
            }
            //Delete from mongo db
            await _mongoDbService.DeleteBusinessAssociateAsync(id);

            return NoContent();
        }
    }
}