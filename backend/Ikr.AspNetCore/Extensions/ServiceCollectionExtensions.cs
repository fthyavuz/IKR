using Ikr.Database.Repositories;
using Ikr.Domain.Repositories;

namespace Ikr.AspNetCore.Extensions;

public static class ServiceCollectionExtensions
{
	public static void RegisterServices(this IServiceCollection services)
	{
		if (services == null) throw new ArgumentNullException(nameof(services));
		services.AddSingleton<IEventRepository, EventRepository>();
	}
}
