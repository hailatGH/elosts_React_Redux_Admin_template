// Styling Import
import "./App.css";

// Custom Components
import { Sidebar, Navbar, CustomRoutes } from "./components";

// Context imports
import { SidebarStateProvider } from "./contexts/UIContexts";

export default function App() {
  return (
    <SidebarStateProvider>
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
    </SidebarStateProvider>
  );
}
