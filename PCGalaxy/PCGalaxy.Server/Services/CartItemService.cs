using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class CartItemService(IUnitOfWork unitOfWork) : ICartItemService
	{
		public async Task<CartItemDto?> GetByIdAsync(Guid id)
		{
			var cartItem = await unitOfWork.CartItemRepository.GetByConditionAsync(w => w.Id == id)
				.FirstOrDefaultAsync();
			return cartItem == null
				? null
				: new CartItemDto
				{
					Id = cartItem.Id,
					ProductId = cartItem.ProductId,
					UserId = cartItem.UserId,
				};
		}

		public async Task<List<CartItemDto>> GetAllByUserIdAsync(string userId)
		{
			return await unitOfWork.CartItemRepository.GetByConditionAsync(w => w.UserId == userId)
				.Select(w => new CartItemDto
				{
					Id = w.Id,
					ProductId = w.ProductId,
					Product = new ProductDto
					{
						Id = w.Product!.Id,
						Name = w.Product.Name,
						Description = w.Product.Description,
						Specifications = w.Product.Specifications,
						Price = w.Product.Price,
						Stock = w.Product.Stock,
						Supplier = w.Product.Supplier,
						DeliveryMethod = w.Product.DeliveryMethod,
						Category = new CategoryDto
						{
							Id = w.Product.Category!.Id,
							Name = w.Product.Category.Name
						},
						ImageBase64 = Convert.ToBase64String(w.Product.Image)
					},
					UserId = w.UserId,
				})
				.ToListAsync();
		}

		public async Task CreateAsync(CartItemDto cartItemDto)
		{
			var cartItem = new CartItem
			{
				Id = cartItemDto.Id,
				ProductId = cartItemDto.ProductId,
				UserId = cartItemDto.UserId,
			};
			await unitOfWork.CartItemRepository.CreateAsync(cartItem);
		}

		public async Task DeleteAsync(CartItemDto cartItemDto)
		{
			var cartItem = await unitOfWork.CartItemRepository.GetByConditionAsync(w => w.Id == cartItemDto.Id)
				.FirstOrDefaultAsync();
			await unitOfWork.CartItemRepository.DeleteAsync(cartItem!);
		}
	}
}
