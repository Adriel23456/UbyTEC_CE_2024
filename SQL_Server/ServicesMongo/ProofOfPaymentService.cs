using SQL_Server.Models;
using MongoDB.Driver;


namespace SQL_Server.ServicesMongo
{
    public class ProofOfPaymentService
    {
        private readonly IMongoCollection<ProofOfPayment> _proofOfPaymentCollection;

        public ProofOfPaymentService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration["MongoDB:ConnectionString"]);
            var mongoDatabase = mongoClient.GetDatabase(configuration["MongoDB:DatabaseName"]);
            _proofOfPaymentCollection = mongoDatabase.GetCollection<ProofOfPayment>(configuration["MongoDB:Collections:ProofOfPayment"]);
        }

        public async Task<List<ProofOfPayment>> GetAllProofOfPaymentCollectionAsync()
        {
            return await _proofOfPaymentCollection.Find(_ => true).ToListAsync();
        }

    }
}