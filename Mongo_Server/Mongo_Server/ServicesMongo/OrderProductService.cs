using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
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

        public async Task<Order_Product?> GetOrder_ProductByIdAsync(string id)
        {
            var filter = Builders<Order_Product>.Filter.Eq(o => o.Order_Code, id);
            return await _order_ProductCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddOrder_ProductAsync(Order_Product orderProduct)
        {
            await _order_ProductCollection.InsertOneAsync(orderProduct);
        }

        public async Task UpdateOrder_ProductAsync(string id, Order_Product orderProduct)
        {
            var filter = Builders<Order_Product>.Filter.Eq(o => o.Order_Code, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Order_Product>.Update
                .Set(o => o.Product_Code, orderProduct.Product_Code)
                .Set(o => o.Amount, orderProduct.Amount);

            // Aplicar la actualización
            await _order_ProductCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteOrder_ProductAsync(string id)
        {
            var filter = Builders<Order_Product>.Filter.Eq(o => o.Order_Code, id);
            await _order_ProductCollection.DeleteOneAsync(filter);
        }


    }
}