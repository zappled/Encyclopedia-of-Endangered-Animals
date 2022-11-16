import React, { useContext } from "react";
import redPandaIcon from "../images/icons/animals/icons8_redpanda_lightgrey.png";
import { Link } from "react-router-dom";
import Context from "../context/context";

const Navbar = (props) => {
  const context = useContext(Context);

  // common navbar component to be used on all logged in pages

  return (
    <>
      <div className="navbar">
        <div className="navbar_icon_container">
          <Link to="/homepage">
            <img src={redPandaIcon} className="navbar_icon" />
          </Link>
        </div>
        <div className="page_header_container">
          {/* shows the current navigated page */}
          <div className="page_header">{props.currentPage}</div>
        </div>
        {/* navigation link to 'conservation status' page */}
        <div className="navlink_container">
          <Link to="/conservation_status" style={{ textDecoration: "none" }}>
            <div className="navlink">
              <span className="material-symbols-outlined">pets</span>
              Conservation Status
            </div>
          </Link>
        </div>
        {/* navigation link to 'search animals' page */}
        <div className="navlink_container">
          <Link to="/search/animals" style={{ textDecoration: "none" }}>
            <div className="navlink">
              <span className="material-symbols-outlined">search</span>Search
              Animals
            </div>
          </Link>
        </div>
        {/* navigation link to 'view other users' page */}
        <div className="navlink_container">
          <Link to="/search/users" style={{ textDecoration: "none" }}>
            <div className="navlink">
              {" "}
              <span className="material-symbols-outlined">person</span>View
              Other Users
            </div>
          </Link>
        </div>
        {/* displays username */}
        <div className="navbar_right_container">
          <span className="username">
            {context.username
              ? JSON.stringify(context.username)
                  .replaceAll(`"`, "")
                  .toUpperCase()
              : ""}
          </span>
          {/* shows database button if logged in user has admin status */}
          {context.isAdmin ? (
            <>
              <Link to="/edit_database">
                <span className="material-symbols-outlined">database</span>
              </Link>
            </>
          ) : (
            ""
          )}
          {/* shows settings button to change password etc */}
          <Link to="/settings">
            <span className="material-symbols-outlined">settings</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
