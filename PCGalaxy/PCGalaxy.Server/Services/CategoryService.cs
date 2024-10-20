using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class CategoryService(IUnitOfWork unitOfWork) : ICategoryService
	{
		public async Task<List<CategoryDto>> GetAllAsync()
		{
			return await unitOfWork.CategoryRepository.GetAllAsync()
				.Select(c => new CategoryDto
				{
					Id = c.Id,
					Name = c.Name
				})
				.ToListAsync();
		}
	}
}
