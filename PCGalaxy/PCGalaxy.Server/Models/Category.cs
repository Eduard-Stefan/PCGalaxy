using System.ComponentModel.DataAnnotations;

namespace PCGalaxy.Server.Models
{
	public class Category
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "The name is required.")]
		[MinLength(1, ErrorMessage = "The name cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The name cannot exceed 256 characters.")]
		public required string Name { get; set; }

		public ICollection<Product>? Products { get; set; }
	}
}
