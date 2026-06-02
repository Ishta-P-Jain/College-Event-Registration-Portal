import { useEffect, useState } from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">
        Upcoming Events
      </h1>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>

            <h2 className="event-name">
              {event.event_name}
            </h2>

            <p className="event-info">
              📍 {event.venue}
            </p>

            <p className="event-info">
              📅 {new Date(event.event_date)
                  .toLocaleDateString()}
            </p>

            <button className="register-btn">
              Register
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default StudentDashboard;