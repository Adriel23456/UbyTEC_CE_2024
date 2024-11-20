using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class Cart_ProductService
    {
        private readonly IMongoCollection<Cart_Product> _cart_ProductCollection;

        public Cart_ProductService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _cart_ProductCollection = mongoDatabase.GetCollection<Cart_Product>(configuration["MongoDB:Collections:Cart_Product"]);
        }

        public async Task<List<Cart_Product>> GetAllCart_ProductAsync()
        {
            return await _cart_ProductCollection.Find(_ => true).ToListAsync();
        }

    }
}