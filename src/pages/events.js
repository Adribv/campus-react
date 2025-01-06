import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { useNavigate } from 'react-router-dom';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from Sanity
  useEffect(() => {
    const query = `*[_type == "event" && status == "upcoming"]{
      _id,
      title,
      slug,
      startDate,
      endDate,
      description,
      venue,
      registrationRequired,
      registrationDeadline,
      maxParticipants,
      fee,
      status
    }`;

    client.fetch(query).then((data) => setEvents(data));
  }, []);

  const handleRegister = (slug) => {
    navigate(`/register/${slug}`);
  };

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Start Date: {new Date(event.startDate).toLocaleString()}</p>
          <p>Venue: {event.venue}</p>
          <p>Registration Required: {event.registrationRequired ? 'Yes' : 'No'}</p>
          <button onClick={() => handleRegister(event.slug.current)}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
}