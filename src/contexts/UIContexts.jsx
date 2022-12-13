import React, { useState, useContext } from "react";

// Sidebar contexts start
const SideBarStateContext = React.createContext();
const SideBarStateToggleContext = React.createContext();

export function useSidebarState() {
  return useContext(SideBarStateContext);
}

export function useSidebarStateUpdate() {
  return useContext(SideBarStateToggleContext);
}

export function SidebarStateProvider({ children }) {
  const [sidebar, setSidebar] = useState(true);

  function toggleSidebar() {
    setSidebar((prevSidebar) => !prevSidebar);
  }
  return (
    <SideBarStateContext.Provider value={sidebar}>
      <SideBarStateToggleContext.Provider value={toggleSidebar}>
        {children}
      </SideBarStateToggleContext.Provider>
    </SideBarStateContext.Provider>
  );
}
// Sidebar contexts end
