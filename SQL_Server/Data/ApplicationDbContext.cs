using Microsoft.EntityFrameworkCore;
using SQL_Server.Models;

namespace SQL_Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<AdminPhone> AdminPhone { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar índice único para UserId
            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.UserId)
                .IsUnique();

            // Configurar relación uno a muchos con AdminPhone
            modelBuilder.Entity<AdminPhone>()
                .HasKey(ap => new { ap.Admin_id, ap.Phone });

            modelBuilder.Entity<AdminPhone>()
                .HasOne(ap => ap.Admin)
                .WithMany(a => a.AdminPhones)
                .HasForeignKey(ap => ap.Admin_id);
            
            // Configurar Id como no generado por la base de datos
            modelBuilder.Entity<Admin>()
                .Property(a => a.Id)
                .ValueGeneratedNever();

            // Configurar columnas computadas
            modelBuilder.Entity<Admin>()
                .Property(a => a.FullName)
                .HasComputedColumnSql("[Name] + ' ' + [FirstSurname] + ' ' + [SecondSurname]", stored: true);

            modelBuilder.Entity<Admin>()
                .Property(a => a.Direction)
                .HasComputedColumnSql("[Province] + ', ' + [Canton] + ', ' + [District]", stored: true);
        }
    }
}