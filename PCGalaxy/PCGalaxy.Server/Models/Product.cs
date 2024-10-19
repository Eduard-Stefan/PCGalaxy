using System.ComponentModel.DataAnnotations;

namespace PCGalaxy.Server.Models
{
	public class Product
	{
		public Guid Id { get; set; } = Guid.NewGuid();

		[Required(ErrorMessage = "The name is required.")]
		[MinLength(1, ErrorMessage = "The name cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The name cannot exceed 256 characters.")]
		public required string Name { get; set; }

		[Required(ErrorMessage = "The description is required.")]
		[MinLength(1, ErrorMessage = "The description cannot be an empty string.")]
		[MaxLength(1024, ErrorMessage = "The description cannot exceed 1024 characters.")]
		public required string Description { get; set; }

		[Required(ErrorMessage = "The specifications are required.")]
		[MinLength(1, ErrorMessage = "The specifications cannot be an empty string.")]
		[MaxLength(1024, ErrorMessage = "The specifications cannot exceed 1024 characters.")]
		public required string Specifications { get; set; }

		[Required(ErrorMessage = "The price is required.")]
		[Range(0, 1000000, ErrorMessage = "The price must be between 0 and 1000000.")]
		public decimal Price { get; set; }

		[Required(ErrorMessage = "The stock is required.")]
		[Range(0, 1000000, ErrorMessage = "The stock must be between 0 and 1000000.")]
		public int Stock { get; set; }

		[Required(ErrorMessage = "The supplier is required.")]
		[MinLength(1, ErrorMessage = "The supplier cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The supplier cannot exceed 256 characters.")]
		public required string Supplier { get; set; }

		[Required(ErrorMessage = "The delivery method is required.")]
		[MinLength(1, ErrorMessage = "The delivery method cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The delivery method cannot exceed 256 characters.")]
		public required string DeliveryMethod { get; set; }

		[Required(ErrorMessage = "The category is required.")]
		[MinLength(1, ErrorMessage = "The category cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The category cannot exceed 256 characters.")]
		public required string Category { get; set; }

		public ICollection<User>? Users { get; set; }
	}
}
