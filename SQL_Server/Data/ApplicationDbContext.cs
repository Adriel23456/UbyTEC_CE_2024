using Microsoft.EntityFrameworkCore;
using SQL_Server.Models;

namespace SQL_Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        // DbSet properties
        public DbSet<Admin> Admin { get; set; }
        public DbSet<AdminPhone> AdminPhone { get; set; }
        public DbSet<BusinessManager> BusinessManager { get; set; }
        public DbSet<BusinessManagerPhone> BusinessManagerPhone { get; set; }
        public DbSet<FoodDeliveryMan> FoodDeliveryMan { get; set; }
        public DbSet<FoodDeliveryManPhone> FoodDeliveryManPhone { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<BusinessType> BusinessType { get; set; }
        public DbSet<BusinessAssociate> BusinessAssociate { get; set; }
        public DbSet<BusinessAssociatePhone> BusinessAssociatePhone { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductPhoto> ProductPhoto { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Cart_Product> Cart_Product { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Order_Product> Order_Product { get; set; }
        public DbSet<ProofOfPayment> ProofOfPayment { get; set; }
        public DbSet<Feedback> FeedBack { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            
        }
    }
}