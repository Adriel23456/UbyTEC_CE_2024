using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
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

        public async Task<List<FoodDeliveryManPhone>> GetAllFoodDeliveryManPhoneAsync()
        {
            return await _foodDeliveryManPhoneCollection.Find(_ => true).ToListAsync();
        }

    }
}