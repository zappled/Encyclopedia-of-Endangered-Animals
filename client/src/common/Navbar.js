import React from "react";
import redPandaIcon from "../images/icons/animals/icons8_redpanda_lightgrey.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <div className="navbar">
        <div className="navbar_icon_container">
          <Link to="/homepage">
            <img src={redPandaIcon} className="navbar_icon" />
          </Link>
        </div>
        <div className="page_header_container">
          <div className="page_header">{props.currentPage}</div>
        </div>
        <div className="navlink_container">
          <Link to="/conservation_status" style={{ textDecoration: "none" }}>
            <div className="navlink">
              <span className="material-symbols-outlined">pets</span>
              Conservation Status
            </div>
          </Link>
        </div>
        <div className="navlink_container">
          <div className="navlink">
            <span className="material-symbols-outlined">search</span>Search
            Database
          </div>
        </div>
        <div className="navlink_container">
          <div className="navlink">
            {" "}
            <span className="material-symbols-outlined">person</span>View Other
            Users
          </div>
        </div>
        <div className="navbar_right_container">
          <span className="username">Username123</span>
          <span className="material-symbols-outlined">database</span>
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
