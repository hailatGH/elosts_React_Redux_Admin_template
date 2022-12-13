// React imports
import { useState } from "react";

// Antd imports
import { Popover, Badge, Divider } from "antd";

// Router imports
import { NavLink } from "react-router-dom";

// Cusotm hook import
import {
  useSidebarState,
  useSidebarStateUpdate,
} from "../../contexts/UIContexts";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const sidebar = useSidebarState();
  const toggleSidebar = useSidebarStateUpdate();

  return (
    <div className="navbar">
      <i onClick={toggleSidebar} className="bx bx-menu"></i>
      <Popover
        content={
          <div className="optionscard">
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              <p>My Profile</p>
            </NavLink>
            <NavLink to="/settings" onClick={() => setOpen(false)}>
              <p>Settings</p>
            </NavLink>
            <NavLink to="/help" onClick={() => setOpen(false)}>
              <p>Help</p>
            </NavLink>
            <Divider style={{ margin: "5px 0px 5px 0px" }} />
            <NavLink to="/logout" onClick={() => setOpen(false)}>
              <p>Log Out</p>
            </NavLink>
          </div>
        }
        title=""
        trigger="click"
        open={open}
        onOpenChange={(newOpen) => setOpen(newOpen)}
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
              <img src="../profile.jpg" alt="profileImg"></img>
            </Badge>
          </div>
        </div>
      </Popover>
    </div>
  );
}
