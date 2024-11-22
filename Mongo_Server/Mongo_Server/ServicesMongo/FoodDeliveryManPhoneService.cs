using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
{
    public class FoodDeliveryManPhoneService
    {
        private readonly IMongoCollection<FoodDeliveryManPhone> _foodDeliveryManPhoneCollection;

        public FoodDeliveryManPhoneService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _foodDeliveryManPhoneCollection = mongoDatabase.GetCollection<FoodDeliveryManPhone>(configuration["MongoDB:Collections:FoodDeliveryManPhone"]);
        }

        public async Task<List<FoodDeliveryManPhone>> GetAllFoodDeliveryManPhonesAsync()
        {
            return await _foodDeliveryManPhoneCollection.Find(_ => true).ToListAsync();
        }

        public async Task<FoodDeliveryManPhone?> GetFoodDeliveryManPhoneByIdAsync(string id)
        {
            var filter = Builders<FoodDeliveryManPhone>.Filter.Eq(f => f.FoodDeliveryMan_UserId, id);
            return await _foodDeliveryManPhoneCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddFoodDeliveryManPhoneAsync(FoodDeliveryManPhone foodDeliveryManPhone)
        {
            await _foodDeliveryManPhoneCollection.InsertOneAsync(foodDeliveryManPhone);
        }

        public async Task UpdateFoodDeliveryManPhoneAsync(string id, FoodDeliveryManPhone foodDeliveryManPhone)
        {
            var filter = Builders<FoodDeliveryManPhone>.Filter.Eq(f => f.FoodDeliveryMan_UserId, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<FoodDeliveryManPhone>.Update
                .Set(f => f.Phone, foodDeliveryManPhone.Phone);

            // Aplicar la actualización
            await _foodDeliveryManPhoneCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteFoodDeliveryManPhoneAsync(string id)
        {
            var filter = Builders<FoodDeliveryManPhone>.Filter.Eq(f => f.FoodDeliveryMan_UserId, id);
            await _foodDeliveryManPhoneCollection.DeleteOneAsync(filter);
        }

    }
}