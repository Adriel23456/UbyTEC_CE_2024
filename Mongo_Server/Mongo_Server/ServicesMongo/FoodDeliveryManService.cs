using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
{
    public class FoodDeliveryManService
    {
        private readonly IMongoCollection<FoodDeliveryMan> _foodDeliveryManCollection;

        public FoodDeliveryManService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _foodDeliveryManCollection = mongoDatabase.GetCollection<FoodDeliveryMan>(configuration["MongoDB:Collections:FoodDeliveryMan"]);
        }

        public async Task<List<FoodDeliveryMan>> GetAllFoodDeliveryManAsync()
        {
            return await _foodDeliveryManCollection.Find(_ => true).ToListAsync();
        }

        public async Task<FoodDeliveryMan?> GetFoodDeliveryManByIdAsync(string id)
        {
            var filter = Builders<FoodDeliveryMan>.Filter.Eq(f => f.UserId, id);
            return await _foodDeliveryManCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddFoodDeliveryManAsync(FoodDeliveryMan foodDeliveryMan)
        {
            await _foodDeliveryManCollection.InsertOneAsync(foodDeliveryMan);
        }

        public async Task UpdateFoodDeliveryManAsync(string id, FoodDeliveryMan foodDeliveryMan)
        {
            var filter = Builders<FoodDeliveryMan>.Filter.Eq(f => f.UserId, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<FoodDeliveryMan>.Update
                .Set(f => f.Name, foodDeliveryMan.Name)
                .Set(f => f.FirstSurname, foodDeliveryMan.FirstSurname)
                .Set(f => f.SecondSurname, foodDeliveryMan.SecondSurname)
                .Set(f => f.FullName, foodDeliveryMan.FullName)
                .Set(f => f.Province, foodDeliveryMan.Province)
                .Set(f => f.Canton, foodDeliveryMan.Canton)
                .Set(f => f.District, foodDeliveryMan.District)
                .Set(f => f.Direction, foodDeliveryMan.Direction)
                .Set(f => f.Password, foodDeliveryMan.Password)
                .Set(f => f.State, foodDeliveryMan.State);

            // Aplicar la actualización
            await _foodDeliveryManCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteFoodDeliveryManAsync(string id)
        {
            var filter = Builders<FoodDeliveryMan>.Filter.Eq(f => f.UserId, id);
            await _foodDeliveryManCollection.DeleteOneAsync(filter);
        }

    }
}