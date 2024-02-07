using Ikr.Domain.Models;
using Ikr.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace Ikr.AspNetCore.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivityController : ControllerBase
{
	private readonly ILogger<ActivityController> _logger;
	private readonly IActivityRepository _activityRepository;
	private const string DataFilePath = "activities.json";


	public ActivityController(ILogger<ActivityController> logger, IActivityRepository activityRepository)
	{
		_logger = logger;
		_activityRepository = activityRepository;
	}

	[HttpGet]
	public async Task<IActionResult> Get()
	{
		var activities = await _activityRepository.GetAll();
		_logger.LogInformation("Activities has been received!");
		return Ok(activities);

	}

	[HttpPost]
	public async Task<IActionResult> Post([FromBody] Activity activity)
	{
		await _activityRepository.Create(activity);
		_logger.LogInformation("The activity has been added!");
		return Ok();
	}
}
