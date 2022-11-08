import React from "react";
import redPandaIcon from "../images/icons/animals/icons8_redpanda_lightgrey.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar_icon_container">
          <Link to="/homepage">
            <img src={redPandaIcon} className="navbar_icon" />
          </Link>
        </div>
        <div className="page_header_container">
          <div className="page_header">Homepage</div>
        </div>
        <div className="navlink_container">
          <div className="navlink">
            <span class="material-symbols-outlined">pets</span>Conservation
            Status
          </div>
        </div>
        <div className="navlink_container">
          <div className="navlink">
            <span class="material-symbols-outlined">search</span>Search Database
          </div>
        </div>
        <div className="navlink_container">
          <div className="navlink">
            {" "}
            <span class="material-symbols-outlined">person</span>View Other
            Users
          </div>
        </div>
        <div className="navbar_right_container">
          <span class="material-symbols-outlined">database</span>
          <span class="material-symbols-outlined">settings</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
