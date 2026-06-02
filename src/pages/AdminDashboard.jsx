import { useState } from "react";

function AdminDashboard() {

  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");

  return (
    <div>

      <h1>Admin Dashboard</h1>

      <h2>Create Event</h2>

      <form>

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) =>
            setEventName(e.target.value)
          }
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) =>
            setVenue(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) =>
            setCapacity(e.target.value)
          }
        />

        <button>
          Create Event
        </button>

      </form>

    </div>
  );
}

export default AdminDashboard;