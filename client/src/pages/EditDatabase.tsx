import React from "react";
import Navbar from "../common/Navbar";
import { Link } from "react-router-dom";

const EditDatabase = () => {
  const currentPage: string = "Edit Database";
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
