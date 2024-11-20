using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class ClientService
    {
        private readonly IMongoCollection<Client> _clientCollection;

        public ClientService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _clientCollection = mongoDatabase.GetCollection<Client>(configuration["MongoDB:Collections:Client"]);
        }

        public async Task<List<Client>> GetAllClientAsync()
        {
            return await _clientCollection.Find(_ => true).ToListAsync();
        }

    }
}