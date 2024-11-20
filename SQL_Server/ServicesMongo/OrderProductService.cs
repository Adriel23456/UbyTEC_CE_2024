using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class OrderProductService
    {
        private readonly IMongoCollection<Order_Product> _order_ProductCollection;

        public OrderProductService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _order_ProductCollection = mongoDatabase.GetCollection<Order_Product>(configuration["MongoDB:Collections:Order_Product"]);
        }

        public async Task<List<Order_Product>> GetAllOrder_ProductAsync()
        {
            return await _order_ProductCollection.Find(_ => true).ToListAsync();
        }

    }
}