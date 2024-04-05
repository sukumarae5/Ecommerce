import React from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiChatsFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import '../App.css'
import { Link } from "react-router-dom";

const SideNavbar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaUserAlt className="icon_header" />
          <span>John Don</span>
          <h6>johndon@company.com</h6>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">

          <Link to="/Dashdata">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>

        </li>
        <li className="sidebar-list-item">
          <Link to="/users">
            <CiUser className="icon" /> User
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsCart4 className="icon" /> Order
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <FaRegListAlt className="icon" /> Products
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGraphUpArrow className="icon" /> Sales Report
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <PiChatsFill className="icon" /> Messages
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <IoIosSettings className="icon" /> Setting
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/">
            <PiSignOutBold className="icon" /> Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNavbar;
