using PCGalaxy.Server.Models;

namespace PCGalaxy.Server.Dtos
{
	public class OrderItemDto
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid ProductId { get; set; }
		public ProductDto? Product { get; set; }
		public Guid OrderId { get; set; }
	}
}
