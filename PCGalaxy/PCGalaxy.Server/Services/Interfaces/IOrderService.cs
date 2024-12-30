using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface IOrderService
	{
		Task<OrderDto> GetByIdAsync(Guid id);
		Task<List<OrderDto>> GetAllByUserIdAsync(string userId);
		Task CreateAsync(OrderDto order);
	}
}
