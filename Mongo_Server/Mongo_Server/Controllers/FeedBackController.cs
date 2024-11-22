using Microsoft.AspNetCore.Mvc;
using Mongo_Server.DTOs;
using Mongo_Server.ServicesMongo;
using Mongo_Server.Models;

namespace Mongo_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly FeedbackService _mongoDbService;

        public FeedBackController(FeedbackService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        // GET: api/FeedBack
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetMongoFeedBacks()
        {
            var mongoFeedbacks = await _mongoDbService.GetAllFeedbacksAsync();

            if (mongoFeedbacks == null || !mongoFeedbacks.Any())
            {
                return NotFound(new { message = "No feedbacks found in the MongoDB database." });
            }

            return Ok(mongoFeedbacks);
        }

        // GET: api/FeedBack/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedBack(string id)
        {
            var feedback = await _mongoDbService.GetFeedbackByIdAsync(id);
            if (feedback == null)
            {
                return NotFound(new { message = $"FeedBack with Id {id} not found." });
            }

            return Ok(feedback);
        }



        // POST: api/FeedBack
        [HttpPost]
        public async Task<ActionResult<FeedBackDTO>> PostFeedBack(FeedBackDTO feedBackDto)
        {
            string idAsString = (feedBackDto.Id).ToString();
            Feedback originalBson = await _mongoDbService.GetFeedbackByIdAsync(idAsString);
            if (originalBson != null)
            {
                return Conflict(new { message = $"Feedback with Id '{feedBackDto.Id}' already exists." });
            }
            
            var mongoFeedback = new Feedback
                {
                    Id_SQL = idAsString,
                    FeedBack_Business = feedBackDto.FeedBack_Business,
                    BusinessGrade = feedBackDto.BusinessGrade,
                    FeedBack_Order = feedBackDto.FeedBack_Order,
                    OrderGrade = feedBackDto.OrderGrade,
                    FeedBack_DeliveryMan = feedBackDto.FeedBack_DeliveryMan,
                    DeliveryManGrade = feedBackDto.DeliveryManGrade,
                    FoodDeliveryMan_UserId = feedBackDto.FoodDeliveryMan_UserId,
                    Order_Code = feedBackDto.Order_Code,
                    BusinessAssociate_Legal_Id = feedBackDto.BusinessAssociate_Legal_Id
                };

            await _mongoDbService.AddFeedBackAsync(mongoFeedback);

            return CreatedAtAction(nameof(GetFeedBack), new { id = feedBackDto?.Id }, feedBackDto);
        }

        // PUT: api/FeedBack/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedBack(long id, FeedBackDTO feedBackDtoUpdate)
        {
            string idAsString = id.ToString();
            Feedback originalBson = await _mongoDbService.GetFeedbackByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Feedback with Id '{id}' not found." });
            }
            // Actualizar los campos necesarios, dejando intacto el _id
            originalBson.FeedBack_Business = feedBackDtoUpdate.FeedBack_Business;
            originalBson.BusinessGrade = feedBackDtoUpdate.BusinessGrade;
            originalBson.FeedBack_Order = feedBackDtoUpdate.FeedBack_Order;
            originalBson.OrderGrade = feedBackDtoUpdate.OrderGrade;
            originalBson.FeedBack_DeliveryMan = feedBackDtoUpdate.FeedBack_DeliveryMan;
            originalBson.DeliveryManGrade = feedBackDtoUpdate.DeliveryManGrade;
            originalBson.FoodDeliveryMan_UserId = feedBackDtoUpdate.FoodDeliveryMan_UserId;
            originalBson.Order_Code = feedBackDtoUpdate.Order_Code;
            originalBson.BusinessAssociate_Legal_Id = feedBackDtoUpdate.BusinessAssociate_Legal_Id;


            await _mongoDbService.UpdateFeedbackAsync(id, originalBson);

            return NoContent();
        }


        // DELETE: api/FeedBack/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedBack(int id)
        {
            //verificar que el feedback exista
            string idAsString = id.ToString();
            Feedback originalBson = await _mongoDbService.GetFeedbackByIdAsync(idAsString);
            if (originalBson == null)
            {
                return NotFound(new { message = $"Feedback with Id '{id}' not found." });
            }
            //Delete from mongo db
            await _mongoDbService.DeleteFeedbackAsync(id);

            return NoContent();
        }
    }
}