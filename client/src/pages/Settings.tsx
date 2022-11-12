import React from "react";
import Navbar from "../common/Navbar";

const Settings = () => {
  const currentPage: string = "Account Settings";
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
