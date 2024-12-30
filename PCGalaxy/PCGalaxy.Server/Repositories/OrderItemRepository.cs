using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class OrderItemRepository(ApplicationDbContext context)
		: Repository<OrderItem>(context, context.OrderItems), IOrderItemRepository;
}
