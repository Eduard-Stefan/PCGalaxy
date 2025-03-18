namespace PCGalaxy.Server.Dtos
{
	public class ProductSearchResultDto
	{
		public required ProductDto Product { get; set; }
		public float Score { get; set; }
	}
}
