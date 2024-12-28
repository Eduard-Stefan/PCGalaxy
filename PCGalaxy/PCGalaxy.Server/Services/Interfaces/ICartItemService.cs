using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface ICartItemService
	{
		Task<CartItemDto?> GetByIdAsync(Guid id);
		Task<List<CartItemDto>> GetAllByUserIdAsync(string userId);
		Task CreateAsync(CartItemDto cartItem);
		Task DeleteAsync(CartItemDto cartItem);
	}
}
