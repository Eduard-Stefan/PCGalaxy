using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class ProductRepository(ApplicationDbContext context)
		: Repository<Product>(context, context.Products), IProductRepository;
}
