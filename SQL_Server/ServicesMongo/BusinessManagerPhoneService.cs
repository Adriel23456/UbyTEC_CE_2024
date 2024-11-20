using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class BusinessManagerPhoneService
    {
        private readonly IMongoCollection<BusinessManagerPhone> _businessManagerPhoneCollection;

        public BusinessManagerPhoneService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _businessManagerPhoneCollection = mongoDatabase.GetCollection<BusinessManagerPhone>(configuration["MongoDB:Collections:BusinessManagerPhone"]);
        }

        public async Task<List<BusinessManagerPhone>> GetAllFeedbacksAsync()
        {
            return await _businessManagerPhoneCollection.Find(_ => true).ToListAsync();
        }

    }
}