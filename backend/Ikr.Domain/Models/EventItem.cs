namespace Ikr.Domain.Models;

public class EventItem
{
	public string Id { get; set; }
	public string Title { get; set; }
	public string Organizer { get; set; }
	public string Description { get; set; }
	public string Location { get; set; }
	public string EvDate { get; set; }
	public string EvTime { get; set; }

	public EventItem(string id, string title, string organizer, string description, string location, string evDate, string evTime)
	{
		if (string.IsNullOrWhiteSpace(id))
		{
			throw new ArgumentNullException(nameof(id));
		}

		if (string.IsNullOrWhiteSpace(title))
		{
			throw new ArgumentNullException(nameof(title));
		}
		if (string.IsNullOrWhiteSpace(organizer))
		{
			throw new ArgumentNullException(nameof(organizer));
		}

		if (string.IsNullOrWhiteSpace(location))
		{
			throw new ArgumentNullException(nameof(location));
		}

		if (string.IsNullOrWhiteSpace(evDate))
		{
			throw new ArgumentNullException(nameof(evDate));
		}

		if (string.IsNullOrWhiteSpace(evTime))
		{
			throw new ArgumentNullException(nameof(evTime));
		}

		Id = id;
		Title  = title;
		Organizer = organizer; 
		Description = description; 
		Location = location;
		EvDate= evDate;
		EvTime = evTime;
	}
}