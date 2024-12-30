using System.ComponentModel.DataAnnotations;

namespace PCGalaxy.Server.Models
{
	public class Order
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public required string UserId { get; set; }
		public User? User { get; set; }
		public ICollection<OrderItem>? OrderItems { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.Now;
		public required string DeliveryAddress { get; set; }
		public required string Coupon { get; set; }
		public decimal Subtotal { get; set; }
		public decimal Discount { get; set; }
		public decimal DeliveryFee { get; set; }
		public decimal Total { get; set; }

		[CreditCard]
		public required string CardNumber { get; set; }
		public required string CardExpiryDate { get; set; }
		public required string CardCvv { get; set; }
	}
}
