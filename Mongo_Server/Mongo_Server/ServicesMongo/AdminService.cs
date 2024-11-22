using Mongo_Server.Models;
using MongoDB.Driver;

namespace Mongo_Server.ServicesMongo
{
    public class AdminService
    {
        private readonly IMongoCollection<Admin> _adminCollection;

        public AdminService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _adminCollection = mongoDatabase.GetCollection<Admin>(configuration["MongoDB:Collections:Admin"]);
        }

        // Obtener todos los administradores
        public async Task<List<Admin>> GetAllAdminsAsync()
        {
            return await _adminCollection.Find(_ => true).ToListAsync();
        }

        // Obtener un administrador por su ID en MongoDB
        public async Task<Admin?> GetAdminByIdAsync(string id)
        {
            var filter = Builders<Admin>.Filter.Eq(a => a.Id, id);
            return await _adminCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddAdminAsync(Admin admin)
        {
            await _adminCollection.InsertOneAsync(admin);
        }
        public async Task UpdateAdminAsync(string id, Admin admin)
        {
            var filter = Builders<Admin>.Filter.Eq(f => f.Id, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Admin>.Update
                .Set(f => f.Name, admin.Name)
                .Set(f => f.FirstSurname, admin.FirstSurname)
                .Set(f => f.SecondSurname, admin.SecondSurname)
                .Set(f => f.FullName, admin.FullName)
                .Set(f => f.Province, admin.Province)
                .Set(f => f.Canton, admin.Canton)
                .Set(f => f.District, admin.District)
                .Set(f => f.Direction, admin.Direction)
                .Set(f => f.UserId, admin.UserId)
                .Set(f => f.Password, admin.Password);

            // Aplicar la actualización
            await _adminCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteAdminAsync(string id)
        {
            var filter = Builders<Admin>.Filter.Eq(f => f.Id, id);
            await _adminCollection.DeleteOneAsync(filter);
        }
        
    }
}
