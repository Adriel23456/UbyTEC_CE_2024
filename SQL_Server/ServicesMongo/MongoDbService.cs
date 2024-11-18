using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class MongoDbService
    {
        private readonly IMongoCollection<MongoFeedback> _feedbackCollection;

        public MongoDbService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _feedbackCollection = mongoDatabase.GetCollection<MongoFeedback>(configuration["MongoDB:CollectionName"]);
        }

        public async Task<List<MongoFeedback>> GetAllFeedbacksAsync()
        {
            return await _feedbackCollection.Find(_ => true).ToListAsync();
        }

        public async Task AddFeedBackAsync(MongoFeedback feedback)
        {
            await _feedbackCollection.InsertOneAsync(feedback);
        }

        public async Task UpdateFeedbackAsync(long id, MongoFeedback feedback)
        {
            string idAsString = id.ToString();
            var filter = Builders<MongoFeedback>.Filter.Eq(f => f.IdSQL, idAsString);
            await _feedbackCollection.ReplaceOneAsync(filter, feedback);
        }

        public async Task DeleteFeedbackAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<MongoFeedback>.Filter.Eq(f => f.IdSQL, idAsString);
            await _feedbackCollection.DeleteOneAsync(filter);
        }
    }
}