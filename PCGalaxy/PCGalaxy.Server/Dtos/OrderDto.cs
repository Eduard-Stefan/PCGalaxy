using PCGalaxy.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace PCGalaxy.Server.Dtos
{
	public class OrderDto
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public required string UserId { get; set; }
		public DateTime? CreatedAt { get; set; }
		public List<OrderItemDto>? OrderItems { get; set; }
		public required string DeliveryAddress { get; set; }
		public required string Coupon { get; set; }
		public decimal Subtotal { get; set; }
		public decimal Discount { get; set; }
		public decimal DeliveryFee { get; set; }
		public decimal Total { get; set; }

		[CreditCard]
		public string? CardNumber { get; set; }
		public string? CardExpiryDate { get; set; }
		public string? CardCvv { get; set; }
	}
}
