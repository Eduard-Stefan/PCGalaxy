using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PCGalaxy.Server.Models
{
	public class User : IdentityUser
	{
		[Required(ErrorMessage = "The first name is required.")]
		[MinLength(1, ErrorMessage = "The first name cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The first name cannot exceed 256 characters.")]
		public required string FirstName { get; set; }

		[Required(ErrorMessage = "The last name is required.")]
		[MinLength(1, ErrorMessage = "The last name cannot be an empty string.")]
		[MaxLength(256, ErrorMessage = "The last name cannot exceed 256 characters.")]
		public required string LastName { get; set; }

		public ICollection<Product>? Products { get; set; }
	}
}
