import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventStudents.css";

function EventStudents() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {

    fetch(
      `http://localhost:5000/api/events/${id}/details`
    )
      .then((res) => res.json())
      .then((data) => {

        setEvent(data.event);
        setStudents(data.students);

      })
      .catch((err) => console.log(err));

  }, [id]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="students-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="event-info-card">

        <h1>{event.event_name}</h1>

        <p>
          📅 {new Date(event.event_date)
            .toLocaleDateString()}
        </p>

        <p>
          📍 {event.venue}
        </p>

        <p>
          👥 Registered:
          {students.length}
        </p>

      </div>

      <div className="students-card">

        <h2>Registered Students</h2>

        {students.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          students.map((student, index) => (

            <div
              key={student.id}
              className="student-item"
            >
              {index + 1}. {student.name}
            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default EventStudents;