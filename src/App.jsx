// React Hooks Import
import { useState } from "react";

// Data
import { UIData } from "./data/UIData";

// Antd Componensts Import
import { Popover, Badge, Divider } from "antd";

// Styling Import
import "./App.css";

// Router Import
import { Routes, Route, NavLink } from "react-router-dom";

// Pages Import
import {
  Dashboard,
  Analytics,
  Music,
  Artists,
  Albums,
  Geners,
  Tracks,
  Podcast,
  Episodes,
  PodcastHosts,
  Podcasts,
  Seasons,
  Radio,
  RadioHosts,
  Stations,
  Playlists,
  Users,
  Settings,
  Profile,
  Help,
  Logout,
  Error,
} from "./pages";

export default function App() {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const toggleSubMenu = (event) => {
    let activeNode = event.target.parentElement.parentElement;
    let nodes =
      event.target.parentElement.parentElement.parentElement.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == "li") {
        if (nodes[i] !== activeNode) {
          if (nodes[i].classList == "showMenu") {
            nodes[i].classList.remove("showMenu");
          }
        }
      }
    }
    activeNode.classList.toggle("showMenu");
  };

  const toggleSideBar = (event) => {
    document.querySelector(".sidebar").classList.toggle("close");
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bx-album"></i>
          <span className="logo_name">ZEMA</span>
          <i onClick={toggleSideBar} className="bx bxs-x-square"></i>
        </div>
        {
          <ul className="nav-links">
            {UIData.map((data) => (
              <li key={data.key}>
                <div className="iocn-link">
                  <NavLink to={data.link_route}>
                    {data.link_icon}
                    <span className="link_name">{data.link_name}</span>
                  </NavLink>
                  {data.has_subMenu ? (
                    <i
                      onClick={() => toggleSubMenu(event)}
                      className="bx bxs-chevron-right arrow"
                    ></i>
                  ) : (
                    ""
                  )}
                </div>
                <ul className={`sub-menu ${data.has_subMenu ? "" : "blank"}`}>
                  <li>
                    <NavLink to={data.link_route} className="link_name">
                      {data.link_name}
                    </NavLink>
                  </li>
                  {data.has_subMenu
                    ? data.subMenu.map((subData) => (
                        <li key={subData.key}>
                          <NavLink to={subData.subMenu_link_route}>
                            {subData.subMenu_link_name}
                          </NavLink>
                        </li>
                      ))
                    : ""}
                </ul>
              </li>
            ))}
          </ul>
        }
      </div>
      <section className="home-section">
        <div className="home-content">
          <div className="navbar">
            <i onClick={toggleSideBar} className="bx bx-menu"></i>
            <Popover
              content={
                <div className="optionscard">
                  <NavLink to="/profile" onClick={hide}>
                    <p>My Profile</p>
                  </NavLink>
                  <NavLink to="/settings" onClick={hide}>
                    <p>Settings</p>
                  </NavLink>
                  <NavLink to="/help" onClick={hide}>
                    <p>Help</p>
                  </NavLink>
                  <Divider style={{ margin: "5px 0px 5px 0px" }} />
                  <NavLink to="/logout" onClick={hide}>
                    <p>Log Out</p>
                  </NavLink>
                </div>
              }
              title=""
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomLeft"
            >
              <div className="profile-details">
                <div className="name-job">
                  <div className="profile_name">Hailemichael</div>
                  <div className="job">Adminstrator</div>
                </div>
                <div className="profile-content">
                  <Badge
                    dot
                    size="default"
                    status="success"
                    style={{ width: "13px", height: "13px" }}
                    placement="start"
                    offset={[-7, 40]}
                  >
                    <img src="profile.jpg" alt="profileImg"></img>
                  </Badge>
                </div>
              </div>
            </Popover>
          </div>
          <div className="home">
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />

                <Route path="/music">
                  <Route index element={<Music />} />
                  <Route path="albums" element={<Albums />} />
                  <Route path="artists" element={<Artists />} />
                  <Route path="geners" element={<Geners />} />
                  <Route path="tracks" element={<Tracks />} />
                </Route>

                <Route path="/podcast">
                  <Route index element={<Podcast />} />
                  <Route path="episodes" element={<Episodes />} />
                  <Route path="podcastHosts" element={<PodcastHosts />} />
                  <Route path="podcasts" element={<Podcasts />} />
                  <Route path="seasons" element={<Seasons />} />
                </Route>

                <Route path="/radio">
                  <Route index element={<Radio />} />
                  <Route path="radioHosts" element={<RadioHosts />} />
                  <Route path="stations" element={<Stations />} />
                </Route>

                <Route path="/playlists" element={<Playlists />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
