﻿using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Dtos;
using PCGalaxy.Server.Models;
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
					}
				})
				.ToListAsync();
		}

		public async Task<ProductDto?> GetByIdAsync(Guid id)
		{
			var product = await unitOfWork.ProductRepository.GetByConditionAsync(f => f.Id == id)
				.FirstOrDefaultAsync();
			return product == null
				? null
				: new ProductDto
				{
					Id = product.Id,
					Name = product.Name,
					Description = product.Description,
					Specifications = product.Specifications,
					Price = product.Price,
					Stock = product.Stock,
					Supplier = product.Supplier,
					DeliveryMethod = product.DeliveryMethod,
					Category = new CategoryDto
					{
						Id = product.CategoryId,
						Name = null
					}
				};
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
				CategoryId = productDto.Category.Id
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
				CategoryId = productDto.Category.Id
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
