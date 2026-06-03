import { useState } from "react";

import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AdminStats from "../components/AdminStats";


function AdminDashboard() {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleCreateEvent = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:5000/api/events",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          event_name: eventName,
          event_date: date,
          venue,
          capacity,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    setEventName("");
    setDate("");
    setVenue("");
    setCapacity("");

  } catch (error) {
    console.log(error);

    alert("Something went wrong");
  }
};

  return (
  <div className="admin-dashboard">

    <h1 className="admin-title">
      Admin Dashboard
    </h1>

    <div className="form-card">

      <h2>Create Event</h2>

        <form onSubmit={handleCreateEvent}>
            

        <div className="form-group">
          <label>Event Name</label>
          <input
            className="form-input"
            type="text"
            value={eventName}
            onChange={(e) =>
              setEventName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Venue</label>
          <input
            className="form-input"
            type="text"
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input
            className="form-input"
            type="number"
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value)
            }
          />
        </div>

        <button
          className="create-btn"
          type="submit"
        >
          Create Event
        </button>

      </form>

    </div>

     <AdminStats />

  </div>
);
}

export default AdminDashboard;