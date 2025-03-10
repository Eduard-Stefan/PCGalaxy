﻿namespace PCGalaxy.Server.Models
{
	public class OrderItem
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid ProductId { get; set; }
		public Product? Product { get; set; }
		public Guid OrderId { get; set; }
		public Order? Order { get; set; }
	}
}
