using Microsoft.EntityFrameworkCore;
using BackendApp.Models;

namespace BackendApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }

        // Aquí se agregarán los DbSet para las entidades del sistema POS
        public DbSet<Producto> Productos { get; set; } = null!;
        // public DbSet<Categoria> Categorias { get; set; }
        // public DbSet<Venta> Ventas { get; set; }
        // public DbSet<DetalleVenta> DetallesVenta { get; set; }
        // public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Aquí se configurarán las relaciones entre entidades y otras configuraciones
            modelBuilder.Entity<Producto>()
                .Property(p => p.Precio)
                .HasPrecision(18, 2);
        }
    }
} 