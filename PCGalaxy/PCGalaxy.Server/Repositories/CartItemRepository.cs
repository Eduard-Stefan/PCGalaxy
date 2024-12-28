using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class CartItemRepository(ApplicationDbContext context)
		: Repository<CartItem>(context, context.CartItems), ICartItemRepository;
}
