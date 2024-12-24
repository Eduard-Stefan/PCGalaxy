using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface IWishlistItemService
	{
		Task<WishlistItemDto?> GetByIdAsync(Guid id);
		Task<List<WishlistItemDto>> GetAllByUserIdAsync(string userId);
		Task CreateAsync(WishlistItemDto wishlistItem);
		Task DeleteAsync(WishlistItemDto wishlistItem);
	}
}
