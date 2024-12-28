namespace PCGalaxy.Server.Dtos
{
	public class CartItemDto
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid ProductId { get; set; }
		public ProductDto? Product { get; set; }
		public string UserId { get; set; }
	}
}
