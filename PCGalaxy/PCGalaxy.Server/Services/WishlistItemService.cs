using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class WishlistItemService(IUnitOfWork unitOfWork) : IWishlistItemService
	{
		public async Task<WishlistItemDto?> GetByIdAsync(Guid id)
		{
			var wishlistItem = await unitOfWork.WishlistItemRepository.GetByConditionAsync(w => w.Id == id)
				.FirstOrDefaultAsync();
			return wishlistItem == null
				? null
				: new WishlistItemDto
				{
					Id = wishlistItem.Id,
					ProductId = wishlistItem.ProductId,
					UserId = wishlistItem.UserId,
				};
		}

		public async Task<List<WishlistItemDto>> GetAllByUserIdAsync(string userId)
		{
			return await unitOfWork.WishlistItemRepository.GetByConditionAsync(w => w.UserId == userId)
				.Select(w => new WishlistItemDto
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

		public async Task CreateAsync(WishlistItemDto wishlistItemDto)
		{
			var wishlistItem = new WishlistItem
			{
				Id = wishlistItemDto.Id,
				ProductId = wishlistItemDto.ProductId,
				UserId = wishlistItemDto.UserId,
			};
			await unitOfWork.WishlistItemRepository.CreateAsync(wishlistItem);
		}

		public async Task DeleteAsync(WishlistItemDto wishlistItemDto)
		{
			var wishlistItem = await unitOfWork.WishlistItemRepository.GetByConditionAsync(w => w.Id == wishlistItemDto.Id)
				.FirstOrDefaultAsync();
			await unitOfWork.WishlistItemRepository.DeleteAsync(wishlistItem!);
		}
	}
}
