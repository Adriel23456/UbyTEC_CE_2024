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

        public async Task<List<BusinessManager>> GetAllBusinessManagersAsync()
        {
            return await _businessManagerCollection.Find(_ => true).ToListAsync();
        }

        public async Task<BusinessManager?> GetBusinessManagerByIdAsync(string id)
        {
            var filter = Builders<BusinessManager>.Filter.Eq(f => f.Email, id);
            return await _businessManagerCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddBusinessManagerAsync(BusinessManager businessManager)
        {
            await _businessManagerCollection.InsertOneAsync(businessManager);
        }

        public async Task UpdateBusinessManagerAsync(string id, BusinessManager businessManager)
        {
            var filter = Builders<BusinessManager>.Filter.Eq(f => f.Email, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<BusinessManager>.Update
                .Set(f => f.Email, businessManager.Email)
                .Set(f => f.Name, businessManager.Name)
                .Set(f => f.FirstSurname, businessManager.FirstSurname)
                .Set(f => f.SecondSurname, businessManager.SecondSurname)
                .Set(f => f.FullName, businessManager.FullName)
                .Set(f => f.Province, businessManager.Province)
                .Set(f => f.Canton, businessManager.Canton)
                .Set(f => f.District, businessManager.District)
                .Set(f => f.Direction, businessManager.Direction)
                .Set(f => f.UserId, businessManager.UserId)
                .Set(f => f.Password, businessManager.Password);

            // Aplicar la actualización
            await _businessManagerCollection.UpdateOneAsync(filter, updateDefinition);
        }


        public async Task DeleteBusinessManagerAsync(string id)
        {
            var filter = Builders<BusinessManager>.Filter.Eq(f => f.Email, id);
            await _businessManagerCollection.DeleteOneAsync(filter);
        }

    }
}