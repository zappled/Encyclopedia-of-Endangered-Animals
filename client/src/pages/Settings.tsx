import React, { useEffect, useContext, useState } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeEmailForm from "../components/ChangeEmailForm";

const Settings = () => {
  const currentPage: string = "Account Settings";

  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

  const [openPasswordForm, setOpenPasswordForm] = useState<boolean>(false);
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(false);

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="settings_page_container">
        <div className="settings_button_container">
          <button
            className="settings_button"
            onClick={() => setOpenPasswordForm(!openPasswordForm)}
          >
            CHANGE PASSWORD
          </button>
          <br />
          {openPasswordForm ? (
            <ChangePasswordForm setOpenPasswordForm={setOpenPasswordForm} />
          ) : (
            <></>
          )}
          <button
            className="settings_button"
            onClick={() => setOpenEmailForm(!openEmailForm)}
          >
            CHANGE EMAIL
          </button>
          <br />
          {openEmailForm ? (
            <ChangeEmailForm setOpenEmailForm={setOpenEmailForm} />
          ) : (
            <></>
          )}
          <button className="settings_button">EDIT SPOTLIGHT</button>
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
