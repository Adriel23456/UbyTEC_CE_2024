using Mongo_Server.Models;
using MongoDB.Driver;


namespace Mongo_Server.ServicesMongo
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

        public async Task<List<ProofOfPayment>> GetAllProofOfPaymentAsync()
        {
            return await _proofOfPaymentCollection.Find(_ => true).ToListAsync();
        }

        public async Task<ProofOfPayment?> GetProofOfPaymentByIdAsync(string code)
        {
            var filter = Builders<ProofOfPayment>.Filter.Eq(p => p.Code, code);
            return await _proofOfPaymentCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task AddProofOfPaymentAsync(ProofOfPayment proofOfPayment)
        {
            await _proofOfPaymentCollection.InsertOneAsync(proofOfPayment);
        }

        public async Task UpdateProofOfPaymentAsync(string code, ProofOfPayment proofOfPayment)
        {
            var filter = Builders<ProofOfPayment>.Filter.Eq(p => p.Code, code);

            // Actualizar solo los campos necesarios, sin actualizar el campo "Code"
            var updateDefinition = Builders<ProofOfPayment>.Update
                .Set(p => p.CreditCardName, proofOfPayment.CreditCardName)
                .Set(p => p.LastDigitsCreditCard, proofOfPayment.LastDigitsCreditCard)
                .Set(p => p.TotalPayment, proofOfPayment.TotalPayment)
                .Set(p => p.Date, proofOfPayment.Date)
                .Set(p => p.Time, proofOfPayment.Time)
                .Set(p => p.ClientFullName, proofOfPayment.ClientFullName)
                .Set(p => p.ClientPhone, proofOfPayment.ClientPhone)
                .Set(p => p.Order_Code, proofOfPayment.Order_Code);

            // Aplicar la actualización
            await _proofOfPaymentCollection.UpdateOneAsync(filter, updateDefinition);
        }

        public async Task DeleteProofOfPaymentAsync(string code)
        {
            var filter = Builders<ProofOfPayment>.Filter.Eq(p => p.Code, code);
            await _proofOfPaymentCollection.DeleteOneAsync(filter);
        }


    }
}