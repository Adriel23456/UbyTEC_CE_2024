using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class BusinessTypeService
    {
        private readonly IMongoCollection<BusinessType> _businessTypeCollection;

        public BusinessTypeService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _businessTypeCollection = mongoDatabase.GetCollection<BusinessType>(configuration["MongoDB:Collections:BusinessType"]);
        }

        public async Task<List<BusinessType>> GetAllFeedbacksAsync()
        {
            return await _businessTypeCollection.Find(_ => true).ToListAsync();
        }

    }
}