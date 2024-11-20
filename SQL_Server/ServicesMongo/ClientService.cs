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

        public async Task<Client?> GetClientByIdAsync(string id)
        {
            var filter = Builders<Client>.Filter.Eq(f => f.Id, id);
            return await _clientCollection.Find(filter).FirstOrDefaultAsync();
        }


        public async Task AddClientAsync(Client client)
        {
            await _clientCollection.InsertOneAsync(client);
        }

        public async Task UpdateClientAsync(string id, Client client)
        {
            var filter = Builders<Client>.Filter.Eq(f => f.Id, id);

            // Actualizar solo los campos necesarios
            var updateDefinition = Builders<Client>.Update
                .Set(f => f.UserId, client.UserId)
                .Set(f => f.Name, client.Name)
                .Set(f => f.FirstSurname, client.FirstSurname)
                .Set(f => f.SecondSurname, client.SecondSurname)
                .Set(f => f.Canton, client.Canton)
                .Set(f => f.District, client.District)
                .Set(f => f.Direction, client.Direction)
                .Set(f => f.Password, client.Password)
                .Set(f => f.Phone, client.Phone)
                .Set(f => f.BirthDate, client.BirthDate);

            // Aplicar la actualización
            await _clientCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteClientAsync(string id)
        {
            var filter = Builders<Client>.Filter.Eq(f => f.Id, id);
            await _clientCollection.DeleteOneAsync(filter);
        }


    }
}