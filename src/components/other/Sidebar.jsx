// Router Import
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bx-album"></i>
        <span className="logo_name">ZEMA</span>
        <i onClick={props.toggleSideBar} className="bx bxs-x-square"></i>
      </div>
      {
        <ul className="nav-links">
          {props.sidebarData.map((data) => (
            <li key={data.key}>
              <div className="iocn-link">
                <NavLink to={data.link_route}>
                  {data.link_icon}
                  <span className="link_name">{data.link_name}</span>
                </NavLink>
                {data.has_subMenu ? (
                  <i
                    onClick={() => props.toggleSubMenu(event)}
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
  );
}
