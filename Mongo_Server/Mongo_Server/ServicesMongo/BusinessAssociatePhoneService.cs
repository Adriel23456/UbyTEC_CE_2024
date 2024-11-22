using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
{
    public class BusinessAssociatePhoneService
    {
        private readonly IMongoCollection<BusinessAssociatePhone> _businessAssociatePhoneCollection;

        public BusinessAssociatePhoneService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _businessAssociatePhoneCollection = mongoDatabase.GetCollection<BusinessAssociatePhone>(configuration["MongoDB:Collections:BusinessAssociatePhone"]);
        }

        public async Task<List<BusinessAssociatePhone>> GetAllBusinessAssociatesPhonesAsync()
        {
            return await _businessAssociatePhoneCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BusinessAssociatePhone?> GetBusinessAssociatePhoneByIdAsync(string id)
        {
            var filter = Builders<BusinessAssociatePhone>.Filter.Eq(f => f.BusinessAssociate_Legal_Id, id);
            return await _businessAssociatePhoneCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddBusinessAssociatePhoneAsync(BusinessAssociatePhone businessAssociatePhone)
        {
            await _businessAssociatePhoneCollection.InsertOneAsync(businessAssociatePhone);
        }

        public async Task UpdateBusinessAssociatePhoneAsync(long id, BusinessAssociatePhone businessAssociatePhone)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessAssociatePhone>.Filter.Eq(f => f.BusinessAssociate_Legal_Id, idAsString);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<BusinessAssociatePhone>.Update
                .Set(f => f.Phone, businessAssociatePhone.Phone);

            // Aplicar la actualización
            await _businessAssociatePhoneCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteBusinessAssociatePhoneAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessAssociatePhone>.Filter.Eq(f => f.BusinessAssociate_Legal_Id, idAsString);
            await _businessAssociatePhoneCollection.DeleteOneAsync(filter);
        }
    }
}