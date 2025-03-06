using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Services.Interfaces;

namespace PCGalaxy.Server.Services
{
	public class ProductService(IUnitOfWork unitOfWork) : IProductService
	{
		public async Task<List<ProductDto>> GetAllAsync()
		{
			return await unitOfWork.ProductRepository.GetAllAsync()
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
					ImageBase64 = Convert.ToBase64String(p.Image)
				})
				.ToListAsync();
		}

		public async Task<List<ProductDto>> GetAllByCategoryAsync(int categoryId)
		{
			return await unitOfWork.ProductRepository.GetByConditionAsync(p => p.CategoryId == categoryId)
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
					ImageBase64 = Convert.ToBase64String(p.Image)
				})
				.ToListAsync();
		}

		public async Task<ProductDto> GetByIdAsync(Guid id)
		{
			return (await unitOfWork.ProductRepository.GetByConditionAsync(p => p.Id == id)
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
					ImageBase64 = Convert.ToBase64String(p.Image)
				})
				.FirstOrDefaultAsync())!;
		}

		public async Task<List<string>> GetProductSuggestionsAsync(string term)
		{
			return await unitOfWork.ProductRepository
				.GetByConditionAsync(p => p.Name.ToLower().StartsWith(term.ToLower()))
				.OrderBy(p => p.Name)
				.Select(p => p.Name)
				.Take(10)
				.ToListAsync();
		}

		public async Task<List<ProductDto>> SearchAsync(string searchTerm)
		{
			searchTerm = searchTerm?.Trim().ToLower() ?? "";

			return await unitOfWork.ProductRepository
				.GetByConditionAsync(p =>
					p.Name.ToLower().Contains(searchTerm))
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
					ImageBase64 = Convert.ToBase64String(p.Image)
				})
				.ToListAsync();
		}

		public async Task CreateAsync(ProductDto productDto)
		{
			var product = new Product
			{
				Id = productDto.Id,
				Name = productDto.Name,
				Description = productDto.Description,
				Specifications = productDto.Specifications,
				Price = productDto.Price,
				Stock = productDto.Stock,
				Supplier = productDto.Supplier,
				DeliveryMethod = productDto.DeliveryMethod,
				CategoryId = productDto.Category.Id,
				Image = Convert.FromBase64String(productDto.ImageBase64)
			};
			await unitOfWork.ProductRepository.CreateAsync(product);
		}

		public async Task UpdateAsync(ProductDto productDto)
		{
			var product = new Product
			{
				Id = productDto.Id,
				Name = productDto.Name,
				Description = productDto.Description,
				Specifications = productDto.Specifications,
				Price = productDto.Price,
				Stock = productDto.Stock,
				Supplier = productDto.Supplier,
				DeliveryMethod = productDto.DeliveryMethod,
				CategoryId = productDto.Category.Id,
				Image = Convert.FromBase64String(productDto.ImageBase64)
			};
			await unitOfWork.ProductRepository.UpdateAsync(product);
		}

		public async Task DeleteAsync(ProductDto productDto)
		{
			var product = await unitOfWork.ProductRepository.GetByConditionAsync(f => f.Id == productDto.Id)
				.FirstOrDefaultAsync();
			await unitOfWork.ProductRepository.DeleteAsync(product!);
		}
	}
}