using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class FeedbackService
    {
        private readonly IMongoCollection<Feedback> _feedbackCollection;

        public FeedbackService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _feedbackCollection = mongoDatabase.GetCollection<Feedback>(configuration["MongoDB:Collections:Feedback"]);
        }

        public async Task<List<Feedback>> GetAllFeedbacksAsync()
        {
            return await _feedbackCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Feedback?> GetFeedbackByIdAsync(string id)
        {
            var filter = Builders<Feedback>.Filter.Eq(f => f.Id_SQL, id);
            return await _feedbackCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddFeedBackAsync(Feedback feedback)
        {
            await _feedbackCollection.InsertOneAsync(feedback);
        }

        public async Task UpdateFeedbackAsync(long id, Feedback feedback)
        {
            string idAsString = id.ToString();
            var filter = Builders<Feedback>.Filter.Eq(f => f.Id_SQL, idAsString);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Feedback>.Update
                .Set(f => f.FeedBack_Business, feedback.FeedBack_Business)
                .Set(f => f.BusinessGrade, feedback.BusinessGrade)
                .Set(f => f.FeedBack_Order, feedback.FeedBack_Order)
                .Set(f => f.OrderGrade, feedback.OrderGrade)
                .Set(f => f.FeedBack_DeliveryMan, feedback.FeedBack_DeliveryMan)
                .Set(f => f.DeliveryManGrade, feedback.DeliveryManGrade)
                .Set(f => f.FoodDeliveryMan_UserId, feedback.FoodDeliveryMan_UserId)
                .Set(f => f.Order_Code, feedback.Order_Code)
                .Set(f => f.BusinessAssociate_Legal_Id, feedback.BusinessAssociate_Legal_Id);

            // Aplicar la actualización
            await _feedbackCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteFeedbackAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<Feedback>.Filter.Eq(f => f.Id_SQL, idAsString);
            await _feedbackCollection.DeleteOneAsync(filter);
        }
    }
}