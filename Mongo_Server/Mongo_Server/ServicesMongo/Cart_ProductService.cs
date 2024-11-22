using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
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

        public async Task<List<Cart_Product>> GetAllCart_ProductsAsync()
        {
            return await _cart_ProductCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Cart_Product?> GetCart_ProductByIdAsync(string id)
        {
            var filter = Builders<Cart_Product>.Filter.Eq(f => f.Cart_Code, id);
            return await _cart_ProductCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddCart_ProductAsync(Cart_Product businessAssociate)
        {
            await _cart_ProductCollection.InsertOneAsync(businessAssociate);
        }

        public async Task UpdateCart_ProductAsync(long id, Cart_Product cart_Product)
        {
            string idAsString = id.ToString();
            var filter = Builders<Cart_Product>.Filter.Eq(f => f.Cart_Code, idAsString);

            var updateDefinition = Builders<Cart_Product>.Update
                .Set(f => f.Product_Code, cart_Product.Product_Code)
                .Set(f => f.Amount, cart_Product.Amount);

            // Aplicar la actualización
            await _cart_ProductCollection.UpdateOneAsync(filter, updateDefinition);
        }


        public async Task DeleteCart_ProductAsync(long id)
        {
            string idAsString = id.ToString();
            var filter = Builders<Cart_Product>.Filter.Eq(f => f.Cart_Code, idAsString);
            await _cart_ProductCollection.DeleteOneAsync(filter);
        }

    }
}