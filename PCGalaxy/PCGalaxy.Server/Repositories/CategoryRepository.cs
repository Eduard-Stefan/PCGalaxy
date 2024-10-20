using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class CategoryRepository(ApplicationDbContext context)
		: Repository<Category>(context, context.Categories), ICategoryRepository;
}
