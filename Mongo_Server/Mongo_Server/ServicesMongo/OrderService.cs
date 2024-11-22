using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orderCollection;

        public OrderService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _orderCollection = mongoDatabase.GetCollection<Order>(configuration["MongoDB:Collections:Order"]);
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await _orderCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(string id)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Code, id);
            return await _orderCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddOrderAsync(Order order)
        {
            await _orderCollection.InsertOneAsync(order);
        }

        public async Task UpdateOrderAsync(string id, Order order)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Code, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Order>.Update
                .Set(o => o.State, order.State)
                .Set(o => o.TotalService, order.TotalService)
                .Set(o => o.Direction, order.Direction)
                .Set(o => o.Client_Id, order.Client_Id)
                .Set(o => o.FoodDeliveryMan_UserId, order.FoodDeliveryMan_UserId);

            // Aplicar la actualización
            await _orderCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteOrderAsync(string id)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.Code, id);
            await _orderCollection.DeleteOneAsync(filter);
        }



    }
}