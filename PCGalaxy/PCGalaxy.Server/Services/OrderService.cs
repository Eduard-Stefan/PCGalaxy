using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class OrderService(IUnitOfWork unitOfWork) : IOrderService
	{
		public async Task<OrderDto> GetByIdAsync(Guid id)
		{
			var order = await unitOfWork.OrderRepository.GetByConditionAsync(o => o.Id == id)
			.Select(o => new OrderDto
			{
				Id = o.Id,
				UserId = o.UserId,
				CreatedAt = o.CreatedAt,
				OrderItems = o.OrderItems!.Select(oi => new OrderItemDto
				{
					Id = oi.Id,
					ProductId = oi.ProductId,
					Product = new ProductDto
					{
						Id = oi.Product!.Id,
						Name = oi.Product.Name,
						Description = oi.Product.Description,
						Specifications = oi.Product.Specifications,
						Price = oi.Product.Price,
						Stock = oi.Product.Stock,
						Supplier = oi.Product.Supplier,
						DeliveryMethod = oi.Product.DeliveryMethod,
						Category = new CategoryDto
						{
							Id = oi.Product.Category!.Id,
							Name = oi.Product.Category.Name
						},
						ImageBase64 = Convert.ToBase64String(oi.Product.Image),
						SpecificationsFileBase64 = Convert.ToBase64String(oi.Product.SpecificationsFile)
					},
					OrderId = oi.OrderId
				}).ToList(),
				DeliveryAddress = o.DeliveryAddress,
				Coupon = o.Coupon,
				Subtotal = o.Subtotal,
				Discount = o.Discount,
				DeliveryFee = o.DeliveryFee,
				Total = o.Total
			})
			.FirstOrDefaultAsync();

			return order!;
		}

		public async Task<List<OrderDto>> GetAllByUserIdAsync(string userId)
		{
			var orders = await unitOfWork.OrderRepository.GetByConditionAsync(o => o.UserId == userId)
				.Select(o => new OrderDto
				{
					Id = o.Id,
					UserId = o.UserId,
					CreatedAt = o.CreatedAt,
					DeliveryAddress = o.DeliveryAddress,
					Coupon = o.Coupon,
					Subtotal = o.Subtotal,
					Discount = o.Discount,
					DeliveryFee = o.DeliveryFee,
					Total = o.Total
				})
				.ToListAsync();

			return orders.OrderByDescending(o => o.CreatedAt).ToList();
		}

		public async Task CreateAsync(OrderDto orderDto)
		{
			var order = new Order
			{
				Id = Guid.NewGuid(),
				UserId = orderDto.UserId,
				CreatedAt = DateTime.Now,
				DeliveryAddress = orderDto.DeliveryAddress,
				Coupon = orderDto.Coupon,
				Subtotal = orderDto.Subtotal,
				Discount = orderDto.Discount,
				DeliveryFee = orderDto.DeliveryFee,
				Total = orderDto.Total,
				CardNumber = orderDto.CardNumber!,
				CardExpiryDate = orderDto.CardExpiryDate!,
				CardCvv = orderDto.CardCvv!
			};

			List<Guid> productIds = new List<Guid>();
			await unitOfWork.CartItemRepository.GetByConditionAsync(c => c.UserId == orderDto.UserId)
				.ForEachAsync(c =>
				{
					var orderItem = new OrderItem
					{
						Id = Guid.NewGuid(), 
						ProductId = c.ProductId,
						OrderId = order.Id,
					};
					unitOfWork.OrderItemRepository.CreateAsync(orderItem);
					unitOfWork.CartItemRepository.DeleteAsync(c);
					productIds.Add(orderItem.ProductId);
				});
			
			await unitOfWork.OrderRepository.CreateAsync(order);

			foreach (var productId in productIds)
			{
				var product = await unitOfWork.ProductRepository.GetByConditionAsync(p => p.Id == productId).FirstOrDefaultAsync();
				product!.Stock--;
				await unitOfWork.ProductRepository.UpdateAsync(product);
			}
		}
	}
}
