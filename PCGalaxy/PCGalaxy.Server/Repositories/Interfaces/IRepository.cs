using System.Linq.Expressions;

namespace PCGalaxy.Server.Repositories.Interfaces
{
	public interface IRepository<T> where T : class
	{
		IQueryable<T> GetAllAsync();
		IQueryable<T> GetByConditionAsync(Expression<Func<T, bool>> expression);
		Task CreateAsync(T entity);
		Task UpdateAsync(T entity);
		Task DeleteAsync(T entity);
	}
}
