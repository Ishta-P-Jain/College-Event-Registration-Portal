import { useEffect, useState } from "react";

function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {

    fetch(
      `http://localhost:5000/api/registrations/${studentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        registrations.map((event) => (

          <div
            key={event.id}
            style={{
              background: "#fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >

            <h2>{event.event_name}</h2>

            <p>📍 {event.venue}</p>

            <p>
              📅{" "}
              {new Date(
                event.event_date
              ).toLocaleDateString()}
            </p>

          </div>

        ))
      )}

    </div>
  );
}

export default MyRegistrations;