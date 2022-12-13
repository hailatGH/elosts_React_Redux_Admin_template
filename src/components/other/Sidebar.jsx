// Router Import
import { NavLink } from "react-router-dom";

// Data
import { SidebarData } from "../../data/UIData";

export default function Sidebar() {
  // Toggle submenu
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

  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="bx bx-album"></i>
        <span className="logo_name">ZEMA</span>
        <i
          onClick={() =>
            document.querySelector(".sidebar").classList.toggle("close")
          }
          className="bx bxs-x-square"
        ></i>
      </div>
      {
        <ul className="nav-links">
          {SidebarData.map((data) => (
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
  );
}
