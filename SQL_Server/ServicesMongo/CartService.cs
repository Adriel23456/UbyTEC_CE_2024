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

        public async Task<List<Cart>> GetAllCartsAsync()
        {
            return await _cartCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Cart?> GetCartByIdAsync(string id)
        {
            var filter = Builders<Cart>.Filter.Eq(f => f.Code, id);
            return await _cartCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddCartAsync(Cart cart)
        {
            await _cartCollection.InsertOneAsync(cart);
        }

        public async Task UpdateCartAsync(string id, Cart cart)
        {
            var filter = Builders<Cart>.Filter.Eq(f => f.Code, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Cart>.Update
                .Set(f => f.BusinessAssociate_Legal_Id, cart.BusinessAssociate_Legal_Id)
                .Set(f => f.TotalProductsPrice, cart.TotalProductsPrice)
                .Set(f => f.Client_Id, cart.Client_Id);

            // Aplicar la actualización
            await _cartCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteCartAsync(string id)
        {
            var filter = Builders<Cart>.Filter.Eq(f => f.Code, id);
            await _cartCollection.DeleteOneAsync(filter);
        }

    }
}