using Microsoft.AspNetCore.Identity;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.ViewModels;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface IAccountService
	{
		Task<IdentityResult> RegisterAsync(RegisterViewModel model);
		Task<SignInResult> SignInAsync(LoginViewModel model);
		Task SignOutAsync();
		bool IsSignedIn();
		Task<UserDto?> GetCurrentUserAsync();
		Task<string?> GetCurrentUserRoleAsync();
	}
}
