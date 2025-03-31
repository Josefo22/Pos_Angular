using BackendApp.Data;
using BackendApp.DTOs;
using BackendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Services
{
    public class ProductoService
    {
        private readonly ApplicationDbContext _context;

        public ProductoService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductoDTO>> ObtenerTodosAsync()
        {
            return await _context.Set<Producto>()
                .Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    Stock = p.Stock,
                    Activo = p.Activo,
                    CategoriaId = p.CategoriaId
                }).ToListAsync();
        }

        public async Task<ProductoDTO?> ObtenerPorIdAsync(int id)
        {
            var producto = await _context.Set<Producto>().FindAsync(id);
            
            if (producto == null)
                return null;

            return new ProductoDTO
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,
                Activo = producto.Activo,
                CategoriaId = producto.CategoriaId
            };
        }

        public async Task<ProductoDTO> CrearAsync(CrearProductoDTO productoDTO)
        {
            var producto = new Producto
            {
                Nombre = productoDTO.Nombre,
                Descripcion = productoDTO.Descripcion,
                Precio = productoDTO.Precio,
                Stock = productoDTO.Stock,
                CategoriaId = productoDTO.CategoriaId
            };

            _context.Set<Producto>().Add(producto);
            await _context.SaveChangesAsync();

            return new ProductoDTO
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock,
                Activo = producto.Activo,
                CategoriaId = producto.CategoriaId
            };
        }

        public async Task<bool> ActualizarAsync(int id, ActualizarProductoDTO productoDTO)
        {
            var producto = await _context.Set<Producto>().FindAsync(id);
            
            if (producto == null)
                return false;

            if (productoDTO.Nombre != null)
                producto.Nombre = productoDTO.Nombre;
            
            if (productoDTO.Descripcion != null)
                producto.Descripcion = productoDTO.Descripcion;
            
            if (productoDTO.Precio.HasValue)
                producto.Precio = productoDTO.Precio.Value;
            
            if (productoDTO.Stock.HasValue)
                producto.Stock = productoDTO.Stock.Value;
            
            if (productoDTO.Activo.HasValue)
                producto.Activo = productoDTO.Activo.Value;
            
            if (productoDTO.CategoriaId.HasValue)
                producto.CategoriaId = productoDTO.CategoriaId.Value;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EliminarAsync(int id)
        {
            var producto = await _context.Set<Producto>().FindAsync(id);
            
            if (producto == null)
                return false;

            _context.Set<Producto>().Remove(producto);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 