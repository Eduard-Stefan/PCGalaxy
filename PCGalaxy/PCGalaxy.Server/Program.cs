using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PCGalaxy.Server;
using PCGalaxy.Server.Models;
using PCGalaxy.Server.Repositories.Interfaces;
using PCGalaxy.Server.Repositories;
using PCGalaxy.Server.Services.Interfaces;
using PCGalaxy.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.  
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
	.AddRoles<IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWishlistItemRepository, WishlistItemRepository>();
builder.Services.AddScoped<IWishlistItemService, WishlistItemService>();

builder.Services.AddControllers();

// Add CORS policy  
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin",
		policyBuilder => policyBuilder.WithOrigins("https://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle  
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
	var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
	if (dbContext.Database.GetPendingMigrations().Any())
	{
		dbContext.Database.Migrate();
	}
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.  
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
