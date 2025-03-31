using BackendApp.DTOs;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly ProductoService _productoService;

        public ProductosController(ProductoService productoService)
        {
            _productoService = productoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProductos()
        {
            var productos = await _productoService.ObtenerTodosAsync();
            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProducto(int id)
        {
            var producto = await _productoService.ObtenerPorIdAsync(id);
            
            if (producto == null)
                return NotFound();
            
            return Ok(producto);
        }

        [HttpPost]
        public async Task<ActionResult<ProductoDTO>> PostProducto(CrearProductoDTO productoDTO)
        {
            var resultado = await _productoService.CrearAsync(productoDTO);
            return CreatedAtAction(nameof(GetProducto), new { id = resultado.Id }, resultado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, ActualizarProductoDTO productoDTO)
        {
            var resultado = await _productoService.ActualizarAsync(id, productoDTO);
            
            if (!resultado)
                return NotFound();
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var resultado = await _productoService.EliminarAsync(id);
            
            if (!resultado)
                return NotFound();
            
            return NoContent();
        }
    }
} 