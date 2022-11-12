import React, {useEffect, useContext} from "react";
import Navbar from "../common/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/context";

const EditDatabase = () => {
  const currentPage: string = "Edit Database";

  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);
  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="database_page_container">
        <div className="database_button_container">
          <Link to="/edit_database/search" style={{ textDecoration: "none" }}>
            <button className="database_page_button">
              SEARCH ANIMAL DATABASE
            </button>
          </Link>
          <br />
          <button className="database_page_button">CREATE ANIMAL ENTRY</button>
          <br />
          <button className="database_page_button">EDIT ANIMAL ENTRY</button>
          <br />
          <button className="database_page_button">DELETE ANIMAL ENTRY</button>
        </div>
      </div>
    </>
  );
};

export default EditDatabase;
