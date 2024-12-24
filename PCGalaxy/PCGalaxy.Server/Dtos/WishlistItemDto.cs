using PCGalaxy.Server.Models;

namespace PCGalaxy.Server.Dtos
{
	public class WishlistItemDto
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid ProductId { get; set; }
		public ProductDto? Product { get; set; }
		public string UserId { get; set; }
	}
}
