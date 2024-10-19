using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace PCGalaxy.Server.ViewModels
{
	public class RegisterViewModel : IValidatableObject
	{
		[StringLength(256, ErrorMessage = "The name must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
		public required string FirstName { get; set; }

		[StringLength(256, ErrorMessage = "The name must be at least {2} and at max {1} characters long.", MinimumLength = 1)]
		public required string LastName { get; set; }

		[EmailAddress]
		public required string Email { get; set; }

		[Phone]
		public required string PhoneNumber { get; set; }

		[DataType(DataType.Password)]
		public required string Password { get; set; }

		[DataType(DataType.Password)]
		[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		public required string ConfirmPassword { get; set; }

		public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
		{
			var errors = new List<ValidationResult>();

			if (Password.Length < 6)
			{
				errors.Add(new ValidationResult("Passwords must be at least 6 characters.", new[] { nameof(Password) }));
			}
			if (!Regex.IsMatch(Password, @"\W"))
			{
				errors.Add(new ValidationResult("Passwords must have at least one non alphanumeric character.", new[] { nameof(Password) }));
			}
			if (!Regex.IsMatch(Password, @"\d"))
			{
				errors.Add(new ValidationResult("Passwords must have at least one digit ('0'-'9').", new[] { nameof(Password) }));
			}
			if (!Regex.IsMatch(Password, @"[a-z]"))
			{
				errors.Add(new ValidationResult("Passwords must have at least one lowercase ('a'-'z').", new[] { nameof(Password) }));
			}
			if (!Regex.IsMatch(Password, @"[A-Z]"))
			{
				errors.Add(new ValidationResult("Passwords must have at least one uppercase ('A'-'Z').", new[] { nameof(Password) }));
			}
			if (!Password.Distinct().Any())
			{
				errors.Add(new ValidationResult("Passwords must use at least 1 different characters.", new[] { nameof(Password) }));
			}

			return errors;
		}
	}
}
