using Ikr.Domain.Models;
using Ikr.Domain.Repositories;
using System.Text.Json;

namespace Ikr.Database.Repositories;
public class ActivityRepository : IActivityRepository
{
	private const string DataFilePath = "activities.json";
	public async Task<List<Activity>> GetAll()
	{
		if (System.IO.File.Exists(DataFilePath))
		{
			var jsonData = await System.IO.File.ReadAllTextAsync(DataFilePath);
			var activities = JsonSerializer.Deserialize<List<Activity>>(jsonData);
			return activities;
		}
		return new List<Activity>();
	}

	public async Task Create(Activity activity)
	{
		List<Activity>? activities;
		if (System.IO.File.Exists(DataFilePath))
		{
			var jsonData = await System.IO.File.ReadAllTextAsync(DataFilePath);
			activities = JsonSerializer.Deserialize<List<Activity>>(jsonData);

		}
		else
		{
			activities = new List<Activity>();

		}

		activities.Add(activity);
		var updatedJson = JsonSerializer.Serialize(activities);
		await System.IO.File.WriteAllTextAsync(DataFilePath, updatedJson);
	}
}
