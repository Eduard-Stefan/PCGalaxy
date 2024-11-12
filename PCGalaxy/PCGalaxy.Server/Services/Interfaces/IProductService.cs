using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface IProductService
	{
		Task<List<ProductDto>> GetAllAsync();
		Task<List<ProductDto>> GetAllByCategoryAsync(int categoryId);
		Task<ProductDto?> GetByIdAsync(Guid id);
        Task<List<ProductDto>> SearchAsync(string searchTerm);
        Task CreateAsync(ProductDto product);
		Task UpdateAsync(ProductDto product);
		Task DeleteAsync(ProductDto product);
	}
}
