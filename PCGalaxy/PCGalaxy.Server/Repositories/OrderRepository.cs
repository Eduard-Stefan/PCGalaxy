using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class OrderRepository(ApplicationDbContext context)
		: Repository<Order>(context, context.Orders), IOrderRepository;
}
