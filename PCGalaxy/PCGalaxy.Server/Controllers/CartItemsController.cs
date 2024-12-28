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
	public class CartItemsController(ICartItemService cartItemService) : ControllerBase
	{
		[HttpGet("{userId}")]
		public async Task<IActionResult> GetAllByUserIdAsync(string userId)
		{
			var cartItems = await cartItemService.GetAllByUserIdAsync(userId);
			return Ok(cartItems);
		}

		[HttpPost]
		public async Task<IActionResult> CreateAsync([FromBody, Required] CartItemDto cartItem)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				await cartItemService.CreateAsync(cartItem);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(cartItem);
		}

		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> DeleteAsync(Guid id)
		{
			var cartItem = await cartItemService.GetByIdAsync(id);
			if (cartItem == null)
			{
				return NotFound();
			}

			await cartItemService.DeleteAsync(cartItem);
			return Ok();
		}
	}
}
