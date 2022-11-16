import React, { useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/context";

const EditDatabase = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets current page name on navbar
  const currentPage: string = "Edit Database";

  // auto-navigates user back to login page if not logged in
  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);
  return (
    <>
      {context.isAdmin ? (
        <>
          {/* page linking to database data only appears if logged in & user is admin */}
          <Navbar currentPage={currentPage} />
          <div className="database_page_container">
            <div className="database_button_container">
              <Link
                to="/edit_database/search"
                style={{ textDecoration: "none" }}
              >
                <button className="database_page_button">
                  SEARCH ANIMAL DATABASE
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        // shows error if user is logged in but is not admin
        <div>Administrator rights is required to view this page</div>
      )}
    </>
  );
};

export default EditDatabase;
