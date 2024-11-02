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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Admin configurations
            // Configure unique index for Admin.UserId
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.UserId)
                .IsUnique();

            // Configure composite primary key for AdminPhone
            modelBuilder.Entity<AdminPhone>()
                .HasKey(ap => new { ap.Admin_id, ap.Phone });

            // Configure one-to-many relationship between Admin and AdminPhone
            modelBuilder.Entity<AdminPhone>()
                .HasOne(ap => ap.Admin)
                .WithMany(a => a.AdminPhones)
                .HasForeignKey(ap => ap.Admin_id);

            // Configure Admin.Id as not generated by the database
            modelBuilder.Entity<Admin>()
                .Property(a => a.Id)
                .ValueGeneratedNever();

            // Configure computed columns for Admin
            modelBuilder.Entity<Admin>()
                .Property(a => a.FullName)
                .HasComputedColumnSql("[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true);

            modelBuilder.Entity<Admin>()
                .Property(a => a.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);

            // BusinessManager configurations
            // Configure unique index for BusinessManager.UserId
            modelBuilder.Entity<BusinessManager>()
                .HasIndex(bm => bm.UserId)
                .IsUnique();

            // Configure composite primary key for BusinessManagerPhone
            modelBuilder.Entity<BusinessManagerPhone>()
                .HasKey(bmp => new { bmp.BusinessManager_Email, bmp.Phone });

            // Configure one-to-many relationship between BusinessManager and BusinessManagerPhone
            modelBuilder.Entity<BusinessManagerPhone>()
                .HasOne(bmp => bmp.BusinessManager)
                .WithMany(bm => bm.BusinessManagerPhones)
                .HasForeignKey(bmp => bmp.BusinessManager_Email);

            // Configure BusinessManager.Email as not generated by the database
            modelBuilder.Entity<BusinessManager>()
                .Property(bm => bm.Email)
                .ValueGeneratedNever();

            // Configure computed columns for BusinessManager
            modelBuilder.Entity<BusinessManager>()
                .Property(bm => bm.FullName)
                .HasComputedColumnSql("[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true);

            modelBuilder.Entity<BusinessManager>()
                .Property(bm => bm.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);

            // Configure one-to-one relationship between BusinessManager and BusinessAssociate
            modelBuilder.Entity<BusinessManager>()
                .HasOne(bm => bm.BusinessAssociate)
                .WithOne(ba => ba.BusinessManager)
                .HasForeignKey<BusinessAssociate>(ba => ba.BusinessManager_Email);

            // BusinessType configurations
            // Configure unique index for BusinessType.Name
            modelBuilder.Entity<BusinessType>()
                .HasIndex(bt => bt.Name)
                .IsUnique();

            // Configure one-to-many relationship between BusinessType and BusinessAssociate
            modelBuilder.Entity<BusinessType>()
                .HasMany(bt => bt.BusinessAssociates)
                .WithOne(ba => ba.BusinessType)
                .HasForeignKey(ba => ba.BusinessType_Identification);

            // FoodDeliveryMan configurations
            // Configure FoodDeliveryMan.UserId as not generated by the database
            modelBuilder.Entity<FoodDeliveryMan>()
                .Property(fdm => fdm.UserId)
                .ValueGeneratedNever();

            // Configure composite primary key for FoodDeliveryManPhone
            modelBuilder.Entity<FoodDeliveryManPhone>()
                .HasKey(fdmp => new { fdmp.FoodDeliveryMan_UserId, fdmp.Phone });

            // Configure one-to-many relationship between FoodDeliveryMan and FoodDeliveryManPhone
            modelBuilder.Entity<FoodDeliveryManPhone>()
                .HasOne(fdmp => fdmp.FoodDeliveryMan)
                .WithMany(fdm => fdm.FoodDeliveryManPhones)
                .HasForeignKey(fdmp => fdmp.FoodDeliveryMan_UserId);

            // Configure computed columns for FoodDeliveryMan
            modelBuilder.Entity<FoodDeliveryMan>()
                .Property(fdm => fdm.FullName)
                .HasComputedColumnSql("[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true);

            modelBuilder.Entity<FoodDeliveryMan>()
                .Property(fdm => fdm.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);

            // Client configurations
            // Configure unique index for Client.UserId
            modelBuilder.Entity<Client>()
                .HasIndex(c => c.UserId)
                .IsUnique();

            // Configure Client.Id as not generated by the database
            modelBuilder.Entity<Client>()
                .Property(c => c.Id)
                .ValueGeneratedNever();

            // Configure computed columns for Client
            modelBuilder.Entity<Client>()
                .Property(c => c.FullName)
                .HasComputedColumnSql("[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true);

            modelBuilder.Entity<Client>()
                .Property(c => c.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);

            // BusinessAssociate configurations
            // Configure BusinessAssociate.Legal_Id as not generated by the database
            modelBuilder.Entity<BusinessAssociate>()
                .Property(ba => ba.Legal_Id)
                .ValueGeneratedNever();

            // Configure computed columns for BusinessAssociate
            modelBuilder.Entity<BusinessAssociate>()
                .Property(ba => ba.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);

            // Configure one-to-one relationship between BusinessManager and BusinessAssociate
            modelBuilder.Entity<BusinessAssociate>()
                .HasOne(ba => ba.BusinessManager)
                .WithOne(bm => bm.BusinessAssociate)
                .HasForeignKey<BusinessAssociate>(ba => ba.BusinessManager_Email);

            // Configure one-to-many relationship between BusinessType and BusinessAssociate
            modelBuilder.Entity<BusinessAssociate>()
                .HasOne(ba => ba.BusinessType)
                .WithMany(bt => bt.BusinessAssociates)
                .HasForeignKey(ba => ba.BusinessType_Identification);

            // BusinessAssociatePhone configurations
            // Configure composite primary key for BusinessAssociatePhone
            modelBuilder.Entity<BusinessAssociatePhone>()
                .HasKey(bap => new { bap.BusinessAssociate_Legal_Id, bap.Phone });

            // Configure one-to-many relationship between BusinessAssociate and BusinessAssociatePhone
            modelBuilder.Entity<BusinessAssociatePhone>()
                .HasOne(bap => bap.BusinessAssociate)
                .WithMany(ba => ba.BusinessAssociatePhones)
                .HasForeignKey(bap => bap.BusinessAssociate_Legal_Id);
        }
    }
}