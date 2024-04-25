using Ikr.Domain.Models;
using Ikr.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Ikr.AspNetCore.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class EventController : ControllerBase
	{
		private readonly ILogger<EventController> _logger;
		private readonly IEventRepository _eventRepository;

		public EventController(ILogger<EventController> logger, IEventRepository eventRepository)
		{
			_logger = logger;
			_eventRepository = eventRepository;
		}

		[HttpGet(Name = "GetAllEvents")]
		public async Task<IActionResult> GetAllEvents()
		{
			try
			{
				var events = await _eventRepository.GetAllEvents();
				_logger.LogInformation("Events have been received!");
				return Ok(events);
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while fetching events: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpPost(Name = "CreateEvent")]
		public async Task<IActionResult> CreateEvent([FromBody] EventItem eventItem)
		{
			try
			{
				await _eventRepository.CreateEvent(eventItem);
				_logger.LogInformation("Event has been created!");
				return CreatedAtRoute("GetAllEvents", new { }, eventItem);
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while creating event: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpGet("{id}", Name = "ReadEvent")]
		public async Task<IActionResult> ReadEvent(string id)
		{
			try
			{
				var eventItem = await _eventRepository.ReadEvent(id);
				if (eventItem == null)
					return NotFound();

				_logger.LogInformation($"Event with ID {id} has been retrieved!");
				return Ok(eventItem);
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while reading event: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpPut("{id}", Name = "UpdateEvent")]
		public async Task<IActionResult> UpdateEvent(string id, [FromBody] EventItem updatedEventItem)
		{
			try
			{
				await _eventRepository.UpdateEvent(id, updatedEventItem);
				_logger.LogInformation($"Event with ID {id} has been updated!");
				return NoContent();
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while updating event: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpDelete("{id}", Name = "DeleteEvent")]
		public async Task<IActionResult> DeleteEvent(string id)
		{
			try
			{
				await _eventRepository.DeleteEvent(id);
				_logger.LogInformation($"Event with ID {id} has been deleted!");
				return NoContent();
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while deleting event: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}

		[HttpGet("filter")]
		public async Task<IActionResult> FilterEvents([FromQuery] string date)
		{
			try
			{
				var events = await _eventRepository.FilterEvents(date);
				_logger.LogInformation("Events have been received!");
				return Ok(events);
			}
			catch (Exception ex)
			{
				_logger.LogError($"Error occurred while filtering events: {ex.Message}");
				return StatusCode(500, "Internal server error");
			}
		}
	}
}
