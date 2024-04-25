using Ikr.Domain.Models;
using Ikr.Domain.Repositories;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Ikr.Database.Repositories
{
	public class EventRepository : IEventRepository
	{
		private const string DataFilePath = "events.json";
		private readonly ILogger<EventRepository> _logger;

		public EventRepository(ILogger<EventRepository> logger)
		{
			_logger = logger;
		}

		public async Task<List<EventItem>> GetAllEvents()
		{
			try
			{
				if (File.Exists(DataFilePath)) {
					var jsonData = await System.IO.File.ReadAllTextAsync(DataFilePath);

					// Desialize the JSON data into array of objects
					var events = JsonConvert.DeserializeObject<List<EventItem>>(jsonData);
					return events;
				}
				else
				{
					return null; // Return null instead of an empty list
				}
			}
			catch (Exception ex)
			{
				// Handle the exception, log it, or rethrow it depending on your application's requirements
				_logger.LogError($"Error occurred while reading events: {ex.Message}");
				return null;
			}
		}


		public async Task CreateEvent(EventItem eventItem)
		{
			List<EventItem>? events;
			if (File.Exists(DataFilePath))
			{
				var jsonData = await File.ReadAllTextAsync(DataFilePath);
				events = JsonConvert.DeserializeObject<List<EventItem>>(jsonData);
			}
			else
			{
				_logger.LogWarning("The file for data not found!, new file will be created!"); 
				events = new List<EventItem>();
			}

			events.Add(eventItem);
			var updatedJson = JsonConvert.SerializeObject(events);
			await File.WriteAllTextAsync(DataFilePath, updatedJson);
		}

		public async Task<EventItem> ReadEvent(string id)
		{
			var events =  
				await GetAllEvents();
			return events?.Find(e => e.Id == id) ?? throw new KeyNotFoundException($"Event with id '{id}' not found");
		}

		public async Task UpdateEvent(string id, EventItem updatedEventItem)
		{
			var events = await GetAllEvents();
			var existingEvent = events?.FindIndex(e => e.Id == id);
			if (existingEvent == -1)
			{
				throw new KeyNotFoundException($"Event with id '{id}' not found");
			}

			events[existingEvent.Value] = updatedEventItem;
			var updatedJson = JsonConvert.SerializeObject(events);
			await File.WriteAllTextAsync(DataFilePath, updatedJson);
		}

		public async Task DeleteEvent(string id)
		{
			var events = await GetAllEvents();
			events?.RemoveAll(e => e.Id == id);
			var updatedJson = JsonConvert.SerializeObject(events);
			await File.WriteAllTextAsync(DataFilePath, updatedJson);
		}

		public async Task<List<EventItem?>> FilterEvents(string date)
		{
			var events = await GetAllEvents();
			return events?.FindAll(e => e.EvDate == date);
		}
	}
}
