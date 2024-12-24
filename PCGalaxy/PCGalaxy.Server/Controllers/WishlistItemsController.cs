using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class WishlistItemsController(IWishlistItemService wishlistItemService) : ControllerBase
	{
		[HttpGet("{userId}")]
		public async Task<IActionResult> GetAllByUserIdAsync(string userId)
		{
			var wishlistItems = await wishlistItemService.GetAllByUserIdAsync(userId);
			return Ok(wishlistItems);
		}

		[HttpPost]
		public async Task<IActionResult> CreateAsync([FromBody, Required] WishlistItemDto wishlistItem)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				await wishlistItemService.CreateAsync(wishlistItem);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(wishlistItem);
		}

		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> DeleteAsync(Guid id)
		{
			var wishlistItem = await wishlistItemService.GetByIdAsync(id);
			if (wishlistItem == null)
			{
				return NotFound();
			}

			await wishlistItemService.DeleteAsync(wishlistItem);
			return Ok();
		}
	}
}
