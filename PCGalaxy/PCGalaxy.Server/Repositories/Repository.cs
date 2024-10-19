using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Repositories.Interfaces;

namespace PCGalaxy.Server.Repositories
{
	public class Repository<T>(DbContext context, DbSet<T> dbSet) : IRepository<T> where T : class
	{
		public IQueryable<T> GetAllAsync()
		{
			return dbSet;
		}

		public IQueryable<T> GetByConditionAsync(Expression<Func<T, bool>> expression)
		{
			return dbSet.Where(expression);
		}

		public async Task CreateAsync(T entity)
		{
			await dbSet.AddAsync(entity);
			await context.SaveChangesAsync();
		}

		public async Task UpdateAsync(T entity)
		{
			dbSet.Update(entity);
			await context.SaveChangesAsync();
		}

		public async Task DeleteAsync(T entity)
		{
			dbSet.Remove(entity);
			await context.SaveChangesAsync();
		}
	}
}
