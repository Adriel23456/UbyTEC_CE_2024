using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
{
    public class BusinessAssociateService
    {
        private readonly IMongoCollection<BusinessAssociate> _businessAssociateCollection;

        public BusinessAssociateService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _businessAssociateCollection = mongoDatabase.GetCollection<BusinessAssociate>(configuration["MongoDB:Collections:BusinessAssociate"]);
        }

        public async Task<List<BusinessAssociate>> GetAllBusinessAssociatesAsync()
        {
            return await _businessAssociateCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BusinessAssociate?> GetBusinessAssociateByIdAsync(string id)
        {
            var filter = Builders<BusinessAssociate>.Filter.Eq(f => f.Legal_Id, id);
            return await _businessAssociateCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddBusinessAssociateAsync(BusinessAssociate businessAssociate)
        {
            await _businessAssociateCollection.InsertOneAsync(businessAssociate);
        }

        public async Task UpdateBusinessAssociateAsync(long id, BusinessAssociate businessAssociate)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessAssociate>.Filter.Eq(f => f.Legal_Id, idAsString);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<BusinessAssociate>.Update
                .Set(f => f.Email, businessAssociate.Email)
                .Set(f => f.State, businessAssociate.State)
                .Set(f => f.BusinessName, businessAssociate.BusinessName)
                .Set(f => f.Direction, businessAssociate.Direction)
                .Set(f => f.Province, businessAssociate.Province)
                .Set(f => f.Canton, businessAssociate.Canton)
                .Set(f => f.District, businessAssociate.District)
                .Set(f => f.SINPE, businessAssociate.SINPE)
                .Set(f => f.RejectReason, businessAssociate.RejectReason)
                .Set(f => f.BusinessManager_Email, businessAssociate.BusinessManager_Email)
                .Set(f => f.BusinessType_Identification, businessAssociate.BusinessType_Identification);

            // Aplicar la actualización
            await _businessAssociateCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteBusinessAssociateAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<BusinessAssociate>.Filter.Eq(f => f.Legal_Id, idAsString);
            await _businessAssociateCollection.DeleteOneAsync(filter);
        }
    }
}