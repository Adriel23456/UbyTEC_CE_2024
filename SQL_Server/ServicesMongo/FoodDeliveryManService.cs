using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
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

        public async Task<List<FoodDeliveryMan>> GetAllFoodDeliveryManPhoneAsync()
        {
            return await _foodDeliveryManCollection.Find(_ => true).ToListAsync();
        }

    }
}