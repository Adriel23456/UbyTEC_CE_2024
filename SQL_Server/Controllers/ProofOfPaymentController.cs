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
    public class ProofOfPaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProofOfPaymentController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/ProofOfPayment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProofOfPaymentDTO>>> GetProofOfPayments()
        {
            var proofsOfPayment = await _context.ProofOfPayment
                .FromSqlRaw("EXEC sp_GetAllProofOfPayments")
                .ToListAsync();

            return _mapper.Map<List<ProofOfPaymentDTO>>(proofsOfPayment);
        }

        // GET: api/ProofOfPayment/{code}
        [HttpGet("{code}")]
        public async Task<ActionResult<ProofOfPaymentDTO>> GetProofOfPayment(int code)
        {
            var proofsOfPayment = await _context.ProofOfPayment
                .FromSqlRaw("EXEC sp_GetProofOfPaymentByCode @Code = {0}", code)
                .ToListAsync();

            var proofOfPayment = proofsOfPayment.FirstOrDefault();

            if (proofOfPayment == null)
            {
                return NotFound(new { message = $"ProofOfPayment with Code {code} not found." });
            }

            return _mapper.Map<ProofOfPaymentDTO>(proofOfPayment);
        }

        // POST: api/ProofOfPayment
        [HttpPost]
        public async Task<ActionResult<ProofOfPaymentDTO>> PostProofOfPayment(ProofOfPaymentDTO_Create proofOfPaymentDtoCreate)
        {
            // Validate date format
            if (!System.Text.RegularExpressions.Regex.IsMatch(proofOfPaymentDtoCreate.Date, @"\d{2}-\d{2}-\d{4}"))
            {
                return BadRequest(new { message = "Date must be in the format dd-mm-yyyy" });
            }

            // Validate time format
            if (!System.Text.RegularExpressions.Regex.IsMatch(proofOfPaymentDtoCreate.Time, @"\d{2}:\d{2}"))
            {
                return BadRequest(new { message = "Time must be in the format mm:hh" });
            }

            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == proofOfPaymentDtoCreate.Order_Code);
            if (!orderExists)
            {
                return BadRequest(new { message = $"Order with Code {proofOfPaymentDtoCreate.Order_Code} does not exist." });
            }

            // Check if a ProofOfPayment already exists for this Order
            var proofExists = await _context.ProofOfPayment.AnyAsync(p => p.Order_Code == proofOfPaymentDtoCreate.Order_Code);
            if (proofExists)
            {
                return Conflict(new { message = $"A ProofOfPayment for Order_Code {proofOfPaymentDtoCreate.Order_Code} already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@CreditCardName", proofOfPaymentDtoCreate.CreditCardName),
                new SqlParameter("@LastDigitsCreditCard", proofOfPaymentDtoCreate.LastDigitsCreditCard),
                new SqlParameter("@Date", proofOfPaymentDtoCreate.Date),
                new SqlParameter("@Time", proofOfPaymentDtoCreate.Time),
                new SqlParameter("@Order_Code", proofOfPaymentDtoCreate.Order_Code)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateProofOfPayment @CreditCardName, @LastDigitsCreditCard, @Date, @Time, @Order_Code", parameters);

            // Retrieve the newly created ProofOfPayment
            var proofsOfPayment = await _context.ProofOfPayment
                .FromSqlRaw("SELECT TOP 1 * FROM [ProofOfPayment] WHERE [Order_Code] = {0} ORDER BY [Code] DESC", proofOfPaymentDtoCreate.Order_Code)
                .ToListAsync();

            var proofOfPayment = proofsOfPayment.FirstOrDefault();

            var createdProofOfPaymentDto = _mapper.Map<ProofOfPaymentDTO>(proofOfPayment);

            return CreatedAtAction(nameof(GetProofOfPayment), new { code = proofOfPayment?.Code }, createdProofOfPaymentDto);
        }

        // PUT: api/ProofOfPayment/{code}
        [HttpPut("{code}")]
        public async Task<IActionResult> PutProofOfPayment(int code, ProofOfPaymentDTO_Update proofOfPaymentDtoUpdate)
        {
            // Check if ProofOfPayment exists
            var proofOfPaymentExists = await _context.ProofOfPayment.AnyAsync(p => p.Code == code);
            if (!proofOfPaymentExists)
            {
                return NotFound(new { message = $"ProofOfPayment with Code {code} not found." });
            }

            // Validate date format
            if (!System.Text.RegularExpressions.Regex.IsMatch(proofOfPaymentDtoUpdate.Date, @"\d{2}-\d{2}-\d{4}"))
            {
                return BadRequest(new { message = "Date must be in the format dd-mm-yyyy" });
            }

            // Validate time format
            if (!System.Text.RegularExpressions.Regex.IsMatch(proofOfPaymentDtoUpdate.Time, @"\d{2}:\d{2}"))
            {
                return BadRequest(new { message = "Time must be in the format mm:hh" });
            }

            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == proofOfPaymentDtoUpdate.Order_Code);
            if (!orderExists)
            {
                return BadRequest(new { message = $"Order with Code {proofOfPaymentDtoUpdate.Order_Code} does not exist." });
            }

            // Check if another ProofOfPayment exists for this Order
            var proofExists = await _context.ProofOfPayment.AnyAsync(p => p.Order_Code == proofOfPaymentDtoUpdate.Order_Code && p.Code != code);
            if (proofExists)
            {
                return Conflict(new { message = $"Another ProofOfPayment for Order_Code {proofOfPaymentDtoUpdate.Order_Code} already exists." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Code", code),
                new SqlParameter("@CreditCardName", proofOfPaymentDtoUpdate.CreditCardName),
                new SqlParameter("@LastDigitsCreditCard", proofOfPaymentDtoUpdate.LastDigitsCreditCard),
                new SqlParameter("@Date", proofOfPaymentDtoUpdate.Date),
                new SqlParameter("@Time", proofOfPaymentDtoUpdate.Time),
                new SqlParameter("@Order_Code", proofOfPaymentDtoUpdate.Order_Code)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateProofOfPayment @Code, @CreditCardName, @LastDigitsCreditCard, @Date, @Time, @Order_Code", parameters);

            return NoContent();
        }

        // DELETE: api/ProofOfPayment/{code}
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteProofOfPayment(int code)
        {
            // Check if ProofOfPayment exists
            var proofOfPaymentExists = await _context.ProofOfPayment.AnyAsync(p => p.Code == code);
            if (!proofOfPaymentExists)
            {
                return NotFound(new { message = $"ProofOfPayment with Code {code} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteProofOfPayment @Code = {0}", code);

            return NoContent();
        }
    }
}