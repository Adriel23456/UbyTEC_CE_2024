using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class BusinessManagerService
    {
        private readonly IMongoCollection<BusinessManager> _businessManagerCollection;

        public BusinessManagerService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _businessManagerCollection = mongoDatabase.GetCollection<BusinessManager>(configuration["MongoDB:Collections:BusinessManager"]);
        }

        public async Task<List<BusinessManager>> GetAllFeedbacksAsync()
        {
            return await _businessManagerCollection.Find(_ => true).ToListAsync();
        }

    }
}