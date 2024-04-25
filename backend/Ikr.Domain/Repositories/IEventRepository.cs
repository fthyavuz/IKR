using Ikr.Domain.Models;

namespace Ikr.Domain.Repositories;

public interface IEventRepository
{
	Task<List<EventItem>> GetAllEvents();
	Task CreateEvent(EventItem eventItem);
	Task<EventItem> ReadEvent(string id);
	Task UpdateEvent(string id, EventItem updatedEventItem);
	Task DeleteEvent(string id);
	Task<List<EventItem>?> FilterEvents(string date);
}
