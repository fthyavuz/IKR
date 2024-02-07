using Ikr.AspNetCore.Extensions;

internal class Program
{
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);


		builder.Services.RegisterServices();
		builder.Services.AddControllers();
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddCors(options =>
		{
			options.AddPolicy("AllowSpecificOrigin", builder =>
			{
				builder.WithOrigins("http://localhost:5173")
					   .AllowAnyMethod()
					   .AllowAnyHeader();
			});

		});

		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		var app = builder.Build();

		app.UseCors("AllowSpecificOrigin");

		// Configure the HTTP request pipeline.
		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}
		app.UseCors("AllowSpecificOrigin");
		app.UseAuthorization();

		app.MapControllers();

		app.Run();
	}
}