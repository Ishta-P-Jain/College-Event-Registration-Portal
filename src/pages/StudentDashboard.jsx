import { useEffect, useState } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // TEMPORARY STUDENT ID
  const studentId = 2;

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId,
            eventId,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="dashboard">

      <h1 className="dashboard-title">
        Upcoming Events
      </h1>

      <button
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() =>
          navigate("/my-registrations")
        }
      >
        My Registrations
      </button>

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
              📅 {new Date(
                event.event_date
              ).toLocaleDateString()}
            </p>

            <p className="event-info">
              Registered:
              {event.registered_count}
              /
              {event.capacity}
            </p>

            {
              event.registered_count >= event.capacity
              ? (
                  <button
                    disabled
                    className="register-btn"
                  >
                    FULL
                  </button>
                )
              : (
                  <button
                    className="register-btn"
                    onClick={() =>
                      handleRegister(event.id)
                    }
                  >
                    Register
                  </button>
                )
            }

          </div>
        ))}
      </div>

    </div>
  );
}

export default StudentDashboard;