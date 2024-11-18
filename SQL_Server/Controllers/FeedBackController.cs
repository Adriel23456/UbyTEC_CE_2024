using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Server.Data;
using SQL_Server.DTOs;
using Microsoft.Data.SqlClient;
using SQL_Server.ServicesMongo;
using SQL_Server.Models;

namespace SQL_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FeedBackController(ApplicationDbContext context, IMapper mapper, MongoDbService mongoDbService)
        {
            _context = context;
            _mapper = mapper;
            _mongoDbService = mongoDbService;
        }

        // GET: api/FeedBack
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBackDTO>>> GetFeedBacks()
        {
            var feedBacks = await _context.FeedBack
                .FromSqlRaw("EXEC sp_GetAllFeedBacks")
                .ToListAsync();

            return _mapper.Map<List<FeedBackDTO>>(feedBacks);
        }

        // GET: api/FeedBack/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBackDTO>> GetFeedBack(long id)
        {
            var feedBacks = await _context.FeedBack
                .FromSqlRaw("EXEC sp_GetFeedBackById @Id = {0}", id)
                .ToListAsync();

            var feedBack = feedBacks.FirstOrDefault();

            if (feedBack == null)
            {
                return NotFound(new { message = $"FeedBack with Id {id} not found." });
            }

            return _mapper.Map<FeedBackDTO>(feedBack);
        }

        // POST: api/FeedBack
        [HttpPost]
        public async Task<ActionResult<FeedBackDTO>> PostFeedBack(FeedBackDTO_Create feedBackDtoCreate)
        {
            // Validate grades
            if (feedBackDtoCreate.BusinessGrade < 0 || feedBackDtoCreate.BusinessGrade > 5)
            {
                return BadRequest(new { message = "BusinessGrade must be between 0 and 5." });
            }
            if (feedBackDtoCreate.OrderGrade < 0 || feedBackDtoCreate.OrderGrade > 5)
            {
                return BadRequest(new { message = "OrderGrade must be between 0 and 5." });
            }
            if (feedBackDtoCreate.DeliveryManGrade < 0 || feedBackDtoCreate.DeliveryManGrade > 5)
            {
                return BadRequest(new { message = "DeliveryManGrade must be between 0 and 5." });
            }

            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == feedBackDtoCreate.Order_Code);
            if (!orderExists)
            {
                return BadRequest(new { message = $"Order with Code {feedBackDtoCreate.Order_Code} does not exist." });
            }

            // Check if a FeedBack already exists for this Order
            var feedbackExists = await _context.FeedBack.AnyAsync(f => f.Order_Code == feedBackDtoCreate.Order_Code);
            if (feedbackExists)
            {
                return Conflict(new { message = $"A FeedBack for Order_Code {feedBackDtoCreate.Order_Code} already exists." });
            }

            // Check if FoodDeliveryMan exists
            var fdmExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == feedBackDtoCreate.FoodDeliveryMan_UserId);
            if (!fdmExists)
            {
                return BadRequest(new { message = $"FoodDeliveryMan with UserId '{feedBackDtoCreate.FoodDeliveryMan_UserId}' does not exist." });
            }

            // Check if BusinessAssociate exists
            var baExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == feedBackDtoCreate.BusinessAssociate_Legal_Id);
            if (!baExists)
            {
                return BadRequest(new { message = $"BusinessAssociate with Legal_Id {feedBackDtoCreate.BusinessAssociate_Legal_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@FeedBack_Business", feedBackDtoCreate.FeedBack_Business),
                new SqlParameter("@BusinessGrade", feedBackDtoCreate.BusinessGrade),
                new SqlParameter("@FeedBack_Order", feedBackDtoCreate.FeedBack_Order),
                new SqlParameter("@OrderGrade", feedBackDtoCreate.OrderGrade),
                new SqlParameter("@FeedBack_DeliveryMan", feedBackDtoCreate.FeedBack_DeliveryMan),
                new SqlParameter("@DeliveryManGrade", feedBackDtoCreate.DeliveryManGrade),
                new SqlParameter("@FoodDeliveryMan_UserId", feedBackDtoCreate.FoodDeliveryMan_UserId),
                new SqlParameter("@Order_Code", feedBackDtoCreate.Order_Code),
                new SqlParameter("@BusinessAssociate_Legal_Id", feedBackDtoCreate.BusinessAssociate_Legal_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_CreateFeedBack @FeedBack_Business, @BusinessGrade, @FeedBack_Order, @OrderGrade, @FeedBack_DeliveryMan, @DeliveryManGrade, @FoodDeliveryMan_UserId, @Order_Code, @BusinessAssociate_Legal_Id", parameters);

            // Retrieve the newly created FeedBack
            var feedBacks = await _context.FeedBack
                .FromSqlRaw("SELECT TOP 1 * FROM [FeedBack] WHERE [Order_Code] = {0} ORDER BY [Id] DESC", feedBackDtoCreate.Order_Code)
                .ToListAsync();

            var feedBack = feedBacks.FirstOrDefault();

            // Guardar en MongoDB
                        
            if (feedBack != null)
            {
                var mongoFeedback = new MongoFeedback
                {
                    FeedBack_Business = feedBack.FeedBack_Business,
                    BusinessGrade = feedBack.BusinessGrade,
                    FeedBack_Order = feedBack.FeedBack_Order,
                    OrderGrade = feedBack.OrderGrade,
                    FeedBack_DeliveryMan = feedBack.FeedBack_DeliveryMan,
                    DeliveryManGrade = feedBack.DeliveryManGrade,
                    FoodDeliveryMan_UserId = feedBack.FoodDeliveryMan_UserId,
                    Order_Code = feedBack.Order_Code,
                    BusinessAssociate_Legal_Id = feedBack.BusinessAssociate_Legal_Id
                };

                await _mongoDbService.AddFeedBackAsync(mongoFeedback);
            }


            var createdFeedBackDto = _mapper.Map<FeedBackDTO>(feedBack);

            return CreatedAtAction(nameof(GetFeedBack), new { id = feedBack?.Id }, createdFeedBackDto);
        }

        // PUT: api/FeedBack/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedBack(long id, FeedBackDTO_Update feedBackDtoUpdate)
        {
            // Check if FeedBack exists
            var feedBackExists = await _context.FeedBack.AnyAsync(f => f.Id == id);
            if (!feedBackExists)
            {
                return NotFound(new { message = $"FeedBack with Id {id} not found." });
            }

            // Validate grades
            if (feedBackDtoUpdate.BusinessGrade < 0 || feedBackDtoUpdate.BusinessGrade > 5)
            {
                return BadRequest(new { message = "BusinessGrade must be between 0 and 5." });
            }
            if (feedBackDtoUpdate.OrderGrade < 0 || feedBackDtoUpdate.OrderGrade > 5)
            {
                return BadRequest(new { message = "OrderGrade must be between 0 and 5." });
            }
            if (feedBackDtoUpdate.DeliveryManGrade < 0 || feedBackDtoUpdate.DeliveryManGrade > 5)
            {
                return BadRequest(new { message = "DeliveryManGrade must be between 0 and 5." });
            }

            // Check if Order exists
            var orderExists = await _context.Order.AnyAsync(o => o.Code == feedBackDtoUpdate.Order_Code);
            if (!orderExists)
            {
                return BadRequest(new { message = $"Order with Code {feedBackDtoUpdate.Order_Code} does not exist." });
            }

            // Check if another FeedBack exists for this Order
            var feedbackExists = await _context.FeedBack.AnyAsync(f => f.Order_Code == feedBackDtoUpdate.Order_Code && f.Id != id);
            if (feedbackExists)
            {
                return Conflict(new { message = $"Another FeedBack for Order_Code {feedBackDtoUpdate.Order_Code} already exists." });
            }

            // Check if FoodDeliveryMan exists
            var fdmExists = await _context.FoodDeliveryMan.AnyAsync(fdm => fdm.UserId == feedBackDtoUpdate.FoodDeliveryMan_UserId);
            if (!fdmExists)
            {
                return BadRequest(new { message = $"FoodDeliveryMan with UserId '{feedBackDtoUpdate.FoodDeliveryMan_UserId}' does not exist." });
            }

            // Check if BusinessAssociate exists
            var baExists = await _context.BusinessAssociate.AnyAsync(ba => ba.Legal_Id == feedBackDtoUpdate.BusinessAssociate_Legal_Id);
            if (!baExists)
            {
                return BadRequest(new { message = $"BusinessAssociate with Legal_Id {feedBackDtoUpdate.BusinessAssociate_Legal_Id} does not exist." });
            }

            // Call Stored Procedure
            var parameters = new[]
            {
                new SqlParameter("@Id", id),
                new SqlParameter("@FeedBack_Business", feedBackDtoUpdate.FeedBack_Business),
                new SqlParameter("@BusinessGrade", feedBackDtoUpdate.BusinessGrade),
                new SqlParameter("@FeedBack_Order", feedBackDtoUpdate.FeedBack_Order),
                new SqlParameter("@OrderGrade", feedBackDtoUpdate.OrderGrade),
                new SqlParameter("@FeedBack_DeliveryMan", feedBackDtoUpdate.FeedBack_DeliveryMan),
                new SqlParameter("@DeliveryManGrade", feedBackDtoUpdate.DeliveryManGrade),
                new SqlParameter("@FoodDeliveryMan_UserId", feedBackDtoUpdate.FoodDeliveryMan_UserId),
                new SqlParameter("@Order_Code", feedBackDtoUpdate.Order_Code),
                new SqlParameter("@BusinessAssociate_Legal_Id", feedBackDtoUpdate.BusinessAssociate_Legal_Id)
            };

            await _context.Database.ExecuteSqlRawAsync("EXEC sp_UpdateFeedBack @Id, @FeedBack_Business, @BusinessGrade, @FeedBack_Order, @OrderGrade, @FeedBack_DeliveryMan, @DeliveryManGrade, @FoodDeliveryMan_UserId, @Order_Code, @BusinessAssociate_Legal_Id", parameters);
            
            // Update MongoDB
            var mongoFeedback = new MongoFeedback
            {
                Id = id, // Ensure you map the appropriate ID
                FeedBack_Business = feedBackDtoUpdate.FeedBack_Business,
                BusinessGrade = feedBackDtoUpdate.BusinessGrade,
                FeedBack_Order = feedBackDtoUpdate.FeedBack_Order,
                OrderGrade = feedBackDtoUpdate.OrderGrade,
                FeedBack_DeliveryMan = feedBackDtoUpdate.FeedBack_DeliveryMan,
                DeliveryManGrade = feedBackDtoUpdate.DeliveryManGrade,
                FoodDeliveryMan_UserId = feedBackDtoUpdate.FoodDeliveryMan_UserId,
                Order_Code = feedBackDtoUpdate.Order_Code,
                BusinessAssociate_Legal_Id = feedBackDtoUpdate.BusinessAssociate_Legal_Id
            };

            await _mongoDbService.UpdateFeedbackAsync(id, mongoFeedback); // Add this method to MongoDbService


            return NoContent();
        }

        // DELETE: api/FeedBack/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            // Check if FeedBack exists
            var feedBackExists = await _context.FeedBack.AnyAsync(f => f.Id == id);
            if (!feedBackExists)
            {
                return NotFound(new { message = $"FeedBack with Id {id} not found." });
            }

            // Call Stored Procedure
            await _context.Database.ExecuteSqlRawAsync("EXEC sp_DeleteFeedBack @Id = {0}", id);
            
            //Delete from mongo db
             // Delete from MongoDB
            await _mongoDbService.DeleteFeedbackAsync(id);

            return NoContent();
        }
    }
}