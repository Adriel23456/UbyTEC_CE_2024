using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.Models;
using Mongo_Server.ServicesMongo;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProofOfPaymentController : ControllerBase
    {
        private readonly ProofOfPaymentService _mongoDbService;

        public ProofOfPaymentController(ProofOfPaymentService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/ProofOfPayment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProofOfPayment>>> GetAllProofOfPayments()
        {
            var proofOfPayments = await _mongoDbService.GetAllProofOfPaymentAsync();

            if (proofOfPayments == null || !proofOfPayments.Any())
            {
                return NotFound(new { message = "No proof of payments found in the MongoDB database." });
            }

            return Ok(proofOfPayments);
        }

        // GET: api/ProofOfPayment/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProofOfPayment>> GetProofOfPayment(string id)
        {
            var proofOfPayment = await _mongoDbService.GetProofOfPaymentByIdAsync(id);
            if (proofOfPayment == null)
            {
                return NotFound(new { message = $"Proof of payment with ID '{id}' not found." });
            }

            return Ok(proofOfPayment);
        }

        // POST: api/ProofOfPayment
        [HttpPost]
        public async Task<ActionResult<ProofOfPaymentDTO>> PostProofOfPayment(ProofOfPaymentDTO proofOfPaymentDto)
        {
            string idAsString = proofOfPaymentDto.Order_Code.ToString(); // Convert to string
            ProofOfPayment originalBson = await _mongoDbService.GetProofOfPaymentByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Proof of payment with Order Code '{proofOfPaymentDto.Order_Code}' already exists." });
            }

            var newProofOfPayment = new ProofOfPayment
            {
                Order_Code = proofOfPaymentDto.Order_Code.ToString(), // Convert to string
                CreditCardName = proofOfPaymentDto.CreditCardName,
                LastDigitsCreditCard = proofOfPaymentDto.LastDigitsCreditCard,
                TotalPayment = proofOfPaymentDto.TotalPayment,
                Date = proofOfPaymentDto.Date,
                Time = proofOfPaymentDto.Time,
                ClientFullName = proofOfPaymentDto.ClientFullName,
                ClientPhone = proofOfPaymentDto.ClientPhone
            };

            await _mongoDbService.AddProofOfPaymentAsync(newProofOfPayment);

            return CreatedAtAction(nameof(GetProofOfPayment), new { id = proofOfPaymentDto.Order_Code }, proofOfPaymentDto);
        }

        // PUT: api/ProofOfPayment/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProofOfPayment(string id, ProofOfPaymentDTO proofOfPaymentDtoUpdate)
        {
            ProofOfPayment originalBson = await _mongoDbService.GetProofOfPaymentByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Proof of payment with ID '{id}' not found." });
            }

            originalBson.CreditCardName = proofOfPaymentDtoUpdate.CreditCardName;
            originalBson.LastDigitsCreditCard = proofOfPaymentDtoUpdate.LastDigitsCreditCard;
            originalBson.TotalPayment = proofOfPaymentDtoUpdate.TotalPayment;
            originalBson.Date = proofOfPaymentDtoUpdate.Date;
            originalBson.Time = proofOfPaymentDtoUpdate.Time;
            originalBson.ClientFullName = proofOfPaymentDtoUpdate.ClientFullName;
            originalBson.ClientPhone = proofOfPaymentDtoUpdate.ClientPhone;

            await _mongoDbService.UpdateProofOfPaymentAsync(id, originalBson);

            return NoContent();
        }

        // DELETE: api/ProofOfPayment/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProofOfPayment(string id)
        {
            var originalBson = await _mongoDbService.GetProofOfPaymentByIdAsync(id);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Proof of payment with ID '{id}' not found." });
            }

            await _mongoDbService.DeleteProofOfPaymentAsync(id);

            return NoContent();
        }
    }
}
