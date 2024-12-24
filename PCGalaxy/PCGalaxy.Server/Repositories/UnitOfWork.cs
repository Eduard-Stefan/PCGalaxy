using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class UnitOfWork(
		ApplicationDbContext context,
		IProductRepository? productRepository,
		ICategoryRepository? categoryRepository,
		IWishlistItemRepository? wishlistItemRepository) : IUnitOfWork
	{
		public IProductRepository ProductRepository => productRepository ??= new ProductRepository(context);
		public ICategoryRepository CategoryRepository => categoryRepository ??= new CategoryRepository(context);
		public IWishlistItemRepository WishlistItemRepository => wishlistItemRepository ??= new WishlistItemRepository(context);
	}
}
