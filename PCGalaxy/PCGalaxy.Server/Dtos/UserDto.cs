namespace PCGalaxy.Server.Dtos
{
	public class UserDto
	{
		public string? Id { get; set; }
		public required string FirstName { get; set; }
		public required string LastName { get; set; }
		public required string Email { get; set; }
		public required string PhoneNumber { get; set; }
	}
}
