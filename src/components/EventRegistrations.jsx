import { useNavigate } from "react-router-dom";

function EventRegistrations({ eventId }) {

  const navigate = useNavigate();

  return (
    <button style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "4px" }} onClick={() =>
      navigate(
        `/event-students/${eventId}`
      )
    }
    >
      View Students
    </button>
  );
}

export default EventRegistrations;