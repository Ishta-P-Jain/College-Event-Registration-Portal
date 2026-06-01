import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>College Event Registration Portal</h1>

        <p>
          Register for events, workshops and college activities with ease.
        </p>

        <div className="buttons">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>Easy Registration</h3>
          <p>Register for events quickly.</p>
        </div>

        <div className="card">
          <h3>Event Management</h3>
          <p>Admins can manage events easily.</p>
        </div>

        <div className="card">
          <h3>Student Dashboard</h3>
          <p>Track all your registrations.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;