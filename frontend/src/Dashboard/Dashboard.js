import React, { useState } from "react";
import SideNavbar from "./SideNavbar";
import Header from "../Components/Header";

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <SideNavbar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Header OpenSidebar={OpenSidebar} />
    </div>
  );
};

export default Dashboard;
