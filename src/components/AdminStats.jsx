import { useEffect, useState } from "react";

import EventRegistrations from "./EventRegistrations";

function AdminStats() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/events/admin/stats"
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });

  }, []);

  const getColor = (percentage) => {

    if (percentage < 50)
      return "green";

    if (percentage < 80)
      return "orange";

    return "red";
  };

  return (
    <div>

      <h2>
        Event Statistics
      </h2>

      <table>

        <thead>
          <tr>
            <th>Event</th>
            <th>Registered</th>
            <th>Capacity</th>
            <th>Fill %</th>
            <th>Students</th>
          </tr>
        </thead>

        <tbody>

          {events.map((event) => {

            const percentage =
              Math.round(
                (
                  event.registered_count /
                  event.capacity
                ) * 100
              );

            return (
              <tr key={event.id}>

                <td>
                  {event.event_name}
                </td>

                <td>
                  {event.registered_count}
                </td>

                <td>
                  {event.capacity}
                </td>

                <td>
                  <span
                    className={`status-badge ${getColor(percentage)}`}
                  >
                    {getColor(percentage) === "green" && "🟢 "}
                    {getColor(percentage) === "orange" && "🟠 "}
                    {getColor(percentage) === "red" && "🔴 "}
                    {percentage}%
                  </span>
                </td>
                <td>
  <EventRegistrations
    eventId={event.id}
  />
</td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}

export default AdminStats;