﻿using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class UnitOfWork(
		ApplicationDbContext context,
		IProductRepository? productRepository,
		ICategoryRepository? categoryRepository,
		IWishlistItemRepository? wishlistItemRepository,
		ICartItemRepository? cartItemRepository,
		IOrderItemRepository? orderItemRepository,
		IOrderRepository? orderRepository) : IUnitOfWork
	{
		public IProductRepository ProductRepository => productRepository ??= new ProductRepository(context);
		public ICategoryRepository CategoryRepository => categoryRepository ??= new CategoryRepository(context);
		public IWishlistItemRepository WishlistItemRepository => wishlistItemRepository ??= new WishlistItemRepository(context);
		public ICartItemRepository CartItemRepository => cartItemRepository ??= new CartItemRepository(context);
		public IOrderItemRepository OrderItemRepository => orderItemRepository ??= new OrderItemRepository(context);
		public IOrderRepository OrderRepository => orderRepository ??= new OrderRepository(context);
	}
}
