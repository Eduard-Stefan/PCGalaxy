using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class WishlistItemRepository(ApplicationDbContext context)
		: Repository<WishlistItem>(context, context.WishlistItems), IWishlistItemRepository;
}
