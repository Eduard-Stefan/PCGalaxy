using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface ICategoryService
	{
		Task<List<CategoryDto>> GetAllAsync();
	}
}
