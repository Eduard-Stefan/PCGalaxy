using PCGalaxy.Server.Dtos;

namespace PCGalaxy.Server.Services.Interfaces
{
	public interface ILuceneSearchService
	{
		Task BuildIndexAsync();

		Task<List<ProductSearchResultDto>>
			SearchAsync(string searchTerm, int? categoryId = null, bool ascending = true);
	}
}
