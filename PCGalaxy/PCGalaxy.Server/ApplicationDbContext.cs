using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server.Models;

namespace PCGalaxy.Server
{
	public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<User>(options)
	{
		public required DbSet<Product> Products { get; set; }
		public required DbSet<Category> Categories { get; set; }
		public required DbSet<WishlistItem> WishlistItems { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<User>(entity =>
			{
				entity.HasKey(u => u.Id);
				entity.Property(u => u.FirstName).IsRequired().HasMaxLength(256);
				entity.Property(u => u.LastName).IsRequired().HasMaxLength(256);
				entity.HasMany(u => u.Products).WithMany(f => f.Users).UsingEntity(j => j.ToTable("UserProducts"));
			});

			modelBuilder.Entity<Product>(entity =>
			{
				entity.HasKey(p => p.Id);
				entity.Property(p => p.Name).IsRequired().HasMaxLength(256);
				entity.Property(p => p.Description).IsRequired().HasMaxLength(1024);
				entity.Property(p => p.Specifications).IsRequired().HasMaxLength(1024);
				entity.Property(p => p.Price).IsRequired().HasPrecision(9, 2);
				entity.Property(p => p.Stock).IsRequired();
				entity.Property(p => p.Supplier).IsRequired().HasMaxLength(256);
				entity.Property(p => p.DeliveryMethod).IsRequired().HasMaxLength(256);
				entity.HasOne(p => p.Category).WithMany(c => c.Products).HasForeignKey(p => p.CategoryId);
				entity.HasMany(p => p.Users).WithMany(u => u.Products).UsingEntity(j => j.ToTable("UserProducts"));
			});

			modelBuilder.Entity<Category>(entity =>
			{
				entity.HasKey(c => c.Id);
				entity.Property(c => c.Name).IsRequired().HasMaxLength(256);
				entity.HasMany(c => c.Products).WithOne(p => p.Category).HasForeignKey(p => p.CategoryId);
			});

			modelBuilder.Entity<WishlistItem>(entity =>
			{
				entity.HasKey(w => w.Id);
				entity.HasOne(w => w.Product).WithMany(p => p.WishlistItems).HasForeignKey(w => w.ProductId);
				entity.HasOne(w => w.User).WithMany(u => u.WishlistItems).HasForeignKey(w => w.UserId);
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

			var motherboard = new Category
			{
				Id = 1,
				Name = "Motherboard"
			};

			var cpu = new Category
			{
				Id = 2,
				Name = "CPU"
			};

			var gpu = new Category
			{
				Id = 3,
				Name = "GPU"
			};

			var ram = new Category
			{
				Id = 4,
				Name = "RAM"
			};

			var storage = new Category
			{
				Id = 5,
				Name = "Storage"
			};

			var powerSupply = new Category
			{
				Id = 6,
				Name = "Power Supply"
			};

			var pcCase = new Category
			{
				Id = 7,
				Name = "PC Case"
			};

			var cooler = new Category
			{
				Id = 8,
				Name = "Cooler"
			};

			var fan = new Category
			{
				Id = 9,
				Name = "Fan"
			};

			var monitor = new Category
			{
				Id = 10,
				Name = "Monitor"
			};

			var keyboard = new Category
			{
				Id = 11,
				Name = "Keyboard"
			};

			var mouse = new Category
			{
				Id = 12,
				Name = "Mouse"
			};

			var mousePad = new Category
			{
				Id = 13,
				Name = "Mouse Pad"
			};

			var headset = new Category
			{
				Id = 14,
				Name = "Headset"
			};

			modelBuilder.Entity<Category>().HasData(motherboard, cpu, gpu, ram, storage, powerSupply, pcCase, cooler, fan, monitor, keyboard, mouse, mousePad, headset);
		}
	}
}
