using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            
            return Ok(products);
        }

        [HttpGet]
        [Route("{id:int}")] 
        public async Task<ActionResult<Product>> GetProducts([FromRoute] int id)
        {
            return await _context.Products.FindAsync(id);
        }

    }
}