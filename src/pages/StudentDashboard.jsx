import { useEffect, useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">

      <h1>Upcoming Events</h1>

      <div className="event-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>

            <h2>{event.event_name}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.event_date).toLocaleDateString()}
            </p>

            <p>
              <strong>Venue:</strong>{" "}
              {event.venue}
            </p>

            <p>
              <strong>Capacity:</strong>{" "}
              {event.capacity}
            </p>

            <button>
              Register
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;