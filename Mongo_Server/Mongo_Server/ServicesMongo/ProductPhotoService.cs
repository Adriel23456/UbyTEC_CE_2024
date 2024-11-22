using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
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

        public async Task<List<ProductPhoto>> GetAllProductPhotosAsync()
        {
            return await _productPhotoCollection.Find(_ => true).ToListAsync();
        }

        public async Task<ProductPhoto?> GetProductPhotoByIdAsync(string id)
        {
            var filter = Builders<ProductPhoto>.Filter.Eq(p => p.Product_Code, id);
            return await _productPhotoCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddProductPhotoAsync(ProductPhoto productPhoto)
        {
            await _productPhotoCollection.InsertOneAsync(productPhoto);
        }

        public async Task UpdateProductPhotoAsync(string id, ProductPhoto productPhoto)
        {
            var filter = Builders<ProductPhoto>.Filter.Eq(p => p.Product_Code, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<ProductPhoto>.Update
                .Set(p => p.PhotoURL, productPhoto.PhotoURL);

            // Aplicar la actualización
            await _productPhotoCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteProductPhotoAsync(string id)
        {
            var filter = Builders<ProductPhoto>.Filter.Eq(p => p.Product_Code, id);
            await _productPhotoCollection.DeleteOneAsync(filter);
        }


    }
}