using Microsoft.AspNetCore.Mvc;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoriesController(ICategoryService categoryService) : ControllerBase
	{
		[HttpGet]
		public async Task<IActionResult> GetAllAsync()
		{
			var categories = await categoryService.GetAllAsync();
			return Ok(categories);
		}
	}
}
