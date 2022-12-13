// Styling Import
import "./App.css";

// Custom Components
import { Sidebar, Navbar, CustomRoutes } from "./components";

export default function App() {
  return (
    <div className="App">
      <Sidebar />
      <section className="home-section">
        <div className="home-content">
          <Navbar />
          <div className="home">
            <CustomRoutes />
          </div>
        </div>
      </section>
    </div>
  );
}
