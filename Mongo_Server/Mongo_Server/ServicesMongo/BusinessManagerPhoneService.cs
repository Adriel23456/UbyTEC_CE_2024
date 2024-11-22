using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
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

        public async Task<List<BusinessManagerPhone>> GetAllBusinessManagersPhonesAsync()
        {
            return await _businessManagerPhoneCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BusinessManagerPhone?> GetBusinessManagerPhoneByIdAsync(string id)
        {
            var filter = Builders<BusinessManagerPhone>.Filter.Eq(f => f.BusinessManager_Email, id);
            return await _businessManagerPhoneCollection.Find(filter).FirstOrDefaultAsync();
        }
        
        public async Task AddBusinessManagerPhoneAsync(BusinessManagerPhone businessManagerPhone)
        {
            await _businessManagerPhoneCollection.InsertOneAsync(businessManagerPhone);
        }

        public async Task UpdateBusinessManagerPhoneAsync(string id, BusinessManagerPhone businessManagerPhone)
        {
            var filter = Builders<BusinessManagerPhone>.Filter.Eq(f => f.BusinessManager_Email, id);

            var updateDefinition = Builders<BusinessManagerPhone>.Update
                .Set(f => f.Phone, businessManagerPhone.Phone);

            // Aplicar la actualización
            await _businessManagerPhoneCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteBusinessManagerPhoneAsync(string id)
        {
            var filter = Builders<BusinessManagerPhone>.Filter.Eq(f => f.BusinessManager_Email, id);
            await _businessManagerPhoneCollection.DeleteOneAsync(filter);
        }
    }
}