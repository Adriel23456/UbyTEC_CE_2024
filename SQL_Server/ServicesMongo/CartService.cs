using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class CartService
    {
        private readonly IMongoCollection<Cart> _cartCollection;

        public CartService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _cartCollection = mongoDatabase.GetCollection<Cart>(configuration["MongoDB:Collections:Cart"]);
        }

        public async Task<List<Cart>> GetAllFeedbacksAsync()
        {
            return await _cartCollection.Find(_ => true).ToListAsync();
        }

    }
}