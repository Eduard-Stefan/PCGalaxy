﻿namespace PCGalaxy.Server.Repositories.Interfaces
{
	public interface IUnitOfWork
	{
		IProductRepository ProductRepository { get; }
	}
}
