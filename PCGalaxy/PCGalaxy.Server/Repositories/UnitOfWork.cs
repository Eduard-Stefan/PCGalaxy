using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class UnitOfWork(ApplicationDbContext context, IProductRepository? productRepository) : IUnitOfWork
	{
		public IProductRepository ProductRepository => productRepository ??= new ProductRepository(context);
	}
}
