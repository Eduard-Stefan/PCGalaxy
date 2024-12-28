namespace PCGalaxy.Server.Models
{
	public class CartItem
	{
		public Guid Id { get; set; } = Guid.NewGuid();
		public Guid ProductId { get; set; }
		public Product? Product { get; set; }
		public string UserId { get; set; }
		public User? User { get; set; }
	}
}
