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

        public async Task<List<BusinessType>> GetAllBusinessTypesAsync()
        {
            return await _businessTypeCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BusinessType?> GetBusinessTypeByIdAsync(string id)
        {
            var filter = Builders<BusinessType>.Filter.Eq(f => f.Identification, id);
            return await _businessTypeCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddBusinessTypeAsync(BusinessType businessType)
        {
            await _businessTypeCollection.InsertOneAsync(businessType);
        }

        public async Task UpdateBusinessTypeAsync(long id, BusinessType businessType)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessType>.Filter.Eq(f => f.Identification, idAsString);

            var updateDefinition = Builders<BusinessType>.Update
                .Set(f => f.Name, businessType.Name);

            // Aplicar la actualización
            await _businessTypeCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteBusinessTypeAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessType>.Filter.Eq(f => f.Identification, idAsString);
            await _businessTypeCollection.DeleteOneAsync(filter);
        }

    }
}