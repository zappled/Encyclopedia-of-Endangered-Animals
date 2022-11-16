import React, { useEffect, useContext, useState } from "react";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ChangeEmailForm from "../components/ChangeEmailForm";
import EditSpotlightForm from "../components/EditSpotlightForm";
import DeleteAccountForm from "../components/DeleteAccountForm";

const Settings = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets current page name on navbar
  const currentPage: string = "Account Settings";

  // auto-navigates user back to login page if not logged in
  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

  // toggles opening/closing the respective forms for each category
  const [openPasswordForm, setOpenPasswordForm] = useState<boolean>(false);
  const [openEmailForm, setOpenEmailForm] = useState<boolean>(false);
  const [openSpotlightForm, setOpenSpotlightForm] = useState<boolean>(false);
  const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="settings_page_container">
        <div className="settings_button_container">
          {/* button to open change password form */}
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
          {/* button to open change email form */}
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
          {/* button to open edit animal spotlight form */}
          <button
            className="settings_button"
            onClick={() => setOpenSpotlightForm(!openSpotlightForm)}
          >
            EDIT SPOTLIGHT
          </button>
          {openSpotlightForm ? (
            <EditSpotlightForm setOpenEmailForm={setOpenSpotlightForm} />
          ) : (
            <></>
          )}
          <br />
          {/* button to open delete account form */}
          <button
            className="settings_button"
            id="delete_button"
            onClick={() => setOpenDeleteForm(!openDeleteForm)}
          >
            DELETE ACCOUNT
          </button>
          {openDeleteForm ? (
            <DeleteAccountForm setOpenDeleteForm={setOpenDeleteForm} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
