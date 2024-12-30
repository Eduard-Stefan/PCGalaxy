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
	public class OrdersController(IOrderService orderService) : ControllerBase
	{
		[HttpGet("{id}")]
		public async Task<IActionResult> GetByIdAsync(Guid id)
		{
			var order = await orderService.GetByIdAsync(id);
			return Ok(order);
		}

		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetAllByUserIdAsync(string userId)
		{
			var orders = await orderService.GetAllByUserIdAsync(userId);
			return Ok(orders);
		}

		[HttpPost]
		public async Task<IActionResult> CreateAsync([FromBody, Required] OrderDto order)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				await orderService.CreateAsync(order);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
			return Ok(order);
		}
	}
}
