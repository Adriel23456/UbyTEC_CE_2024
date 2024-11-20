using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class ProductPhotoService
    {
        private readonly IMongoCollection<ProductPhoto> _productPhotoCollection;

        public ProductPhotoService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _productPhotoCollection = mongoDatabase.GetCollection<ProductPhoto>(configuration["MongoDB:Collections:ProductPhoto"]);
        }

        public async Task<List<ProductPhoto>> GetAllProductPhotoAsync()
        {
            return await _productPhotoCollection.Find(_ => true).ToListAsync();
        }

    }
}