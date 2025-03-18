using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers.Classic;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;
using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class LuceneSearchService : ILuceneSearchService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly FSDirectory _directory;
		private readonly StandardAnalyzer _analyzer;
		private const LuceneVersion Version = LuceneVersion.LUCENE_48;
		private readonly string _indexPath = Path.Combine(System.IO.Directory.GetCurrentDirectory(), "LuceneIndex");

		public LuceneSearchService(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;

			if (!System.IO.Directory.Exists(_indexPath))
			{
				System.IO.Directory.CreateDirectory(_indexPath);
			}

			_directory = FSDirectory.Open(new DirectoryInfo(_indexPath));
			_analyzer = new StandardAnalyzer(Version);
		}

		public async Task BuildIndexAsync()
		{
			var products = await _unitOfWork.ProductRepository.GetAllAsync().ToListAsync();

			var indexConfig = new IndexWriterConfig(Version, _analyzer)
			{
				OpenMode = OpenMode.CREATE
			};

			using var writer = new IndexWriter(_directory, indexConfig);

			foreach (var product in products)
			{
				var doc = new Document
				{
					new StringField("Id", product.Id.ToString(), Field.Store.YES),
					new StringField("CategoryId", product.CategoryId.ToString(), Field.Store.YES)
				};

				if (product.SpecificationsFile.Length > 0)
				{
					try
					{
						var specFileContent = System.Text.Encoding.UTF8.GetString(product.SpecificationsFile);
						doc.Add(new TextField("SpecificationsFileContent", specFileContent, Field.Store.NO));
					}
					catch
					{
						// ignored
					}
				}

				writer.AddDocument(doc);
			}

			writer.Commit();
		}

		public async Task<List<ProductSearchResultDto>> SearchAsync(string searchTerm, int? categoryId = null,
			bool ascending = true)
		{
			using var reader = DirectoryReader.Open(_directory);
			var searcher = new IndexSearcher(reader);

			var fields = new[] { "SpecificationsFileContent" };
			var parser = new MultiFieldQueryParser(Version, fields, _analyzer);

			var contentQuery = parser.Parse(searchTerm);

			Query finalQuery;

			if (categoryId.HasValue)
			{
				var categoryFilter = new TermQuery(new Term("CategoryId", categoryId.Value.ToString()));
				var booleanQuery = new BooleanQuery
				{
					{ contentQuery, Occur.MUST },
					{ categoryFilter, Occur.MUST }
				};
				finalQuery = booleanQuery;
			}
			else
			{
				finalQuery = contentQuery;
			}

			var hits = searcher.Search(finalQuery, 100).ScoreDocs;

			var results = new List<ProductSearchResultDto>();

			foreach (var hit in hits)
			{
				var doc = searcher.Doc(hit.Doc);
				var productId = Guid.Parse(doc.Get("Id"));

				var product = await _unitOfWork.ProductRepository.GetByConditionAsync(p => p.Id == productId)
					.Select(p => new ProductDto
					{
						Id = p.Id,
						Name = p.Name,
						Description = p.Description,
						Specifications = p.Specifications,
						Price = p.Price,
						Stock = p.Stock,
						Supplier = p.Supplier,
						DeliveryMethod = p.DeliveryMethod,
						Category = new CategoryDto
						{
							Id = p.Category!.Id,
							Name = p.Category.Name
						},
						ImageBase64 = Convert.ToBase64String(p.Image),
						SpecificationsFileBase64 = Convert.ToBase64String(p.SpecificationsFile)
					})
					.FirstOrDefaultAsync();

				if (product != null)
				{
					results.Add(new ProductSearchResultDto
					{
						Product = product,
						Score = hit.Score
					});
				}
			}

			return ascending
				? results.OrderBy(r => r.Score).ToList()
				: results.OrderByDescending(r => r.Score).ToList();
		}
	}
}
