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

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _productCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(string code)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Code, code);
            return await _productCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            await _productCollection.InsertOneAsync(product);
        }

        public async Task UpdateProductAsync(string code, Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Code, code);

            // Actualizar solo los campos necesarios, sin actualizar el campo "Code"
            var updateDefinition = Builders<Product>.Update
                .Set(p => p.Name, product.Name)
                .Set(p => p.Price, product.Price)
                .Set(p => p.Category, product.Category)
                .Set(p => p.BusinessAssociate_Legal_Id, product.BusinessAssociate_Legal_Id);

            // Aplicar la actualización
            await _productCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteProductAsync(string code)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Code, code);
            await _productCollection.DeleteOneAsync(filter);
        }


    }
}