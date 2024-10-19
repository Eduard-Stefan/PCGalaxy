using Microsoft.AspNetCore.Identity;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Services.Interfaces;
using PCGalaxy.Server.ViewModels;

namespace PCGalaxy.Server.Services
{
	public class AccountService(UserManager<User> userManager, SignInManager<User> signInManager, IHttpContextAccessor httpContextAccessor)
		: IAccountService
	{
		public async Task<IdentityResult> RegisterAsync(RegisterViewModel model)
		{
			var user = new User
			{
				FirstName = model.FirstName,
				LastName = model.LastName,
				UserName = model.Email,
				Email = model.Email,
				PhoneNumber = model.PhoneNumber
			};

			var result = await userManager.CreateAsync(user, model.Password);
			if (!result.Succeeded) return result;
			await userManager.AddToRoleAsync(user, "user");
			await signInManager.SignInAsync(user, isPersistent: false);

			return result;
		}

		public async Task<SignInResult> SignInAsync(LoginViewModel model)
		{
			return await signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
		}

		public async Task SignOutAsync()
		{
			await signInManager.SignOutAsync();
		}

		public bool IsSignedIn()
		{
			var user = httpContextAccessor.HttpContext?.User;
			return user != null && signInManager.IsSignedIn(user);
		}

		public async Task<UserDto?> GetCurrentUserAsync()
		{
			var user = await userManager.GetUserAsync(httpContextAccessor.HttpContext!.User);

			if (user == null)
			{
				return null;
			}

			return new UserDto
			{
				FirstName = user.FirstName,
				LastName = user.LastName,
				Email = user.Email!,
				PhoneNumber = user.PhoneNumber!
			};
		}

		public async Task<string?> GetCurrentUserRoleAsync()
		{
			var user = await userManager.GetUserAsync(httpContextAccessor.HttpContext!.User);
			
			if (user == null)
			{
				return null;
			}

			var role = await userManager.GetRolesAsync(user);
			return role.FirstOrDefault();
		}
	}
}
