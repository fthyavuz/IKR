using Ikr.Domain.Models;

namespace Ikr.Domain.Repositories;

public interface IActivityRepository
{
	Task<List<Activity>> GetAll();
	Task Create(Activity activity);
}
