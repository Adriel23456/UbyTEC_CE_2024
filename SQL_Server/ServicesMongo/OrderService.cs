using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orderCollection;

        public OrderService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _orderCollection = mongoDatabase.GetCollection<Order>(configuration["MongoDB:Collections:Order"]);
        }

        public async Task<List<Order>> GetAllOrderAsync()
        {
            return await _orderCollection.Find(_ => true).ToListAsync();
        }

    }
}