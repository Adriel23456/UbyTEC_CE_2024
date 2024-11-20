using SQL_Server.Models;
using MongoDB.Driver;

namespace SQL_Server.ServicesMongo
{
    public class AdminPhoneService
    {
        private readonly IMongoCollection<AdminPhone> _adminPhoneCollection;

        public AdminPhoneService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _adminPhoneCollection = mongoDatabase.GetCollection<AdminPhone>(configuration["MongoDB:Collections:AdminPhone"]);
        }

        public async Task<List<AdminPhone>> GetAllAdminPhonesAsync()
        {
            return await _adminPhoneCollection.Find(_ => true).ToListAsync();
        }

        public async Task<AdminPhone?> GetAdminPhoneByIdAsync(string userId)
        {
            var filter = Builders<AdminPhone>.Filter.Eq(ap => ap.Admin_id, userId);
            return await _adminPhoneCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddAdminPhoneAsync(AdminPhone adminPhone)
        {
            await _adminPhoneCollection.InsertOneAsync(adminPhone);
        }

        public async Task UpdateAdminPhoneAsync(string id, AdminPhone adminPhone)
        {
            var filter = Builders<AdminPhone>.Filter.Eq(f => f.Admin_id, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<AdminPhone>.Update
                .Set(f => f.Phone, adminPhone.Phone);
            // Aplicar la actualización
            await _adminPhoneCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteAdminPhoneAsync(string userId)
        {
            var filter = Builders<AdminPhone>.Filter.Eq(ap => ap.Admin_id, userId);

            await _adminPhoneCollection.DeleteOneAsync(filter);
        }
    }
}
