using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class IndexRebuildBackgroundService(
		IServiceProvider serviceProvider,
		ILogger<IndexRebuildBackgroundService> logger) : BackgroundService
	{
		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				logger.LogInformation("Rebuilding Lucene index");

				try
				{
					using var scope = serviceProvider.CreateScope();
					var searchService = scope.ServiceProvider.GetRequiredService<ILuceneSearchService>();
					await searchService.BuildIndexAsync();
					logger.LogInformation("Index rebuilt successfully");
				}
				catch (Exception ex)
				{
					logger.LogError(ex, "Error rebuilding index");
				}

				await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
			}
		}
	}
}
