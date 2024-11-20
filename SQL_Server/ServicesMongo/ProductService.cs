using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _productCollection;

        public ProductService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _productCollection = mongoDatabase.GetCollection<Product>(configuration["MongoDB:Collections:Product"]);
        }

        public async Task<List<Product>> GetAllProductAsync()
        {
            return await _productCollection.Find(_ => true).ToListAsync();
        }

    }
}