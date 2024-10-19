using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Models;

namespace PCGalaxy.Server
{
	public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<User>(options)
	{
		public required DbSet<Product> Products { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Product>(entity =>
			{
				entity.HasKey(f => f.Id);
				entity.Property(f => f.Name).IsRequired().HasMaxLength(256);
				entity.Property(f => f.Description).IsRequired().HasMaxLength(1024);
				entity.Property(f => f.Specifications).IsRequired().HasMaxLength(1024);
				entity.Property(f => f.Price).IsRequired().HasPrecision(9, 2);
				entity.Property(f => f.Stock).IsRequired();
				entity.Property(f => f.Supplier).IsRequired().HasMaxLength(256);
				entity.Property(f => f.DeliveryMethod).IsRequired().HasMaxLength(256);
				entity.Property(f => f.Category).IsRequired().HasMaxLength(256);
				entity.HasMany(f => f.Users).WithMany(u => u.Products).UsingEntity(j => j.ToTable("UserProducts"));
			});

			modelBuilder.Entity<User>(entity =>
			{
				entity.HasKey(u => u.Id);
				entity.Property(u => u.FirstName).IsRequired().HasMaxLength(256);
				entity.Property(u => u.LastName).IsRequired().HasMaxLength(256);
				entity.HasMany(u => u.Products).WithMany(f => f.Users).UsingEntity(j => j.ToTable("UserProducts"));
			});

			var admin = new IdentityRole("admin")
			{
				NormalizedName = "admin"
			};

			var user = new IdentityRole("user")
			{
				NormalizedName = "user"
			};

			modelBuilder.Entity<IdentityRole>().HasData(admin, user);
		}
	}
}
