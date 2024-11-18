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

        public async Task AddFeedBackAsync(MongoFeedback feedback)
        {
            await _feedbackCollection.InsertOneAsync(feedback);
        }
    }
}
