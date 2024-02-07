namespace Ikr.Domain.Models;

public class Activity
{
	public string Title { get; init; }
	public string Description { get; init; }
	public string Photo { get; init; }
	public string Date { get; init; }

	public Activity(string title, string description, string photo, string date)
	{
		if (string.IsNullOrWhiteSpace(title))
		{
			throw new ArgumentNullException(nameof(title));
		}

		if (string.IsNullOrWhiteSpace(description))
		{
			throw new ArgumentNullException(nameof(description));
		}
		if (string.IsNullOrWhiteSpace(photo))
		{
			throw new ArgumentNullException(nameof(photo));
		}

		if (string.IsNullOrWhiteSpace(date))
		{
			throw new ArgumentNullException(nameof(date));
		}
		Title = title;
		Description = description;
		Photo = photo;
		Date = date;
	}
}
