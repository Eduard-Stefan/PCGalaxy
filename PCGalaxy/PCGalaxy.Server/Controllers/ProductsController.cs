using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILuceneSearchService _luceneSearchService;

        public ProductsController(IProductService productService, ILuceneSearchService luceneSearchService)
        {
            _productService = productService;
            _luceneSearchService = luceneSearchService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("category/{categoryId:int}")]
        public async Task<IActionResult> GetAllByCategoryAsync(int categoryId)
        {
            var products = await _productService.GetAllByCategoryAsync(categoryId);
            return Ok(products);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<ProductDto>>> Search([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return BadRequest("Search term is required.");
            }

            var products = await _productService.SearchAsync(term);
            return Ok(products);
        }

        [HttpGet("suggestions")]
        public async Task<ActionResult<List<string>>> GetSearchSuggestions([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return BadRequest("Search term is required.");
            }

            var productNames = await _productService.GetProductSuggestionsAsync(term);
            return Ok(productNames);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody, Required] ProductDto product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _productService.CreateAsync(product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(product);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody, Required] ProductDto product)
        {
            if (id != product.Id)
            {
                return BadRequest("The ID in the URL does not match the ID in the request body.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _productService.UpdateAsync(product);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(product);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productService.DeleteAsync(product);
            return Ok();
        }

        [HttpGet("rebuild-index")]
        public async Task<IActionResult> RebuildIndex()
        {
            await _luceneSearchService.BuildIndexAsync();
            return Ok("Index rebuilt successfully");
        }

        [HttpGet("search-in-specs")]
        public async Task<ActionResult<List<ProductSearchResultDto>>> Search(string query, int? categoryId = null, bool ascending = false)
        {
	        if (string.IsNullOrWhiteSpace(query))
	        {
		        return BadRequest("Query cannot be empty");
	        }

	        var results = await _luceneSearchService.SearchAsync(query, categoryId, ascending);
	        return Ok(results);
        }
    }
}
