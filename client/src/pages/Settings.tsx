import React, { useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const Settings = () => {
  const currentPage: string = "Account Settings";

  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="settings_page_container">
        <div className="settings_button_container">
          <button className="settings_button">CHANGE PASSWORD</button>
          <br />
          <button className="settings_button">CHANGE EMAIL</button>
          <br />
          <button className="settings_button">EDIT FAVOURITES</button>
          <br />
          <button className="settings_button" id="delete_button">
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
