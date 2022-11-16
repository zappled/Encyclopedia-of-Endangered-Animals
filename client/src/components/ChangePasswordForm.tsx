import React, { useContext, useRef, useState } from "react";
import Context from "../context/context";

const ChangePasswordForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);

  // captures input to change email
  const currentPasswordRef = useRef<any>();
  const newPasswordRef = useRef<any>();
  // changes page display text after password is successfully changed
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
  // changes page display text if failed to change password
  const [failedToChangePassword, setFailedToChangePassword] =
    useState<boolean>(false);
  // sets corresponding error message to display, if failed to change password
  const [errorMessage, setErrorMessage] = useState("");

  // attempts to update account password after form onSubmit
  const changePassword = async (e: any) => {
    e.preventDefault();
    const accountDetails = {
      uuid: context.userId,
      currentPassword: currentPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };
    try {
      const res = await fetch(`http://localhost:5001/users/password`, {
        method: "PATCH",
        body: JSON.stringify(accountDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const result = await res.json();
      if (result.message === "Password has been changed") {
        setPasswordChanged(true);
      } else {
        setFailedToChangePassword(true);
        setErrorMessage(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // closes the password form and resets text back to default if opened again
  const resetPasswordForm = () => {
    setPasswordChanged(false);
    props.setOpenPasswordForm(false);
  };

  return (
    <>
      {!failedToChangePassword ? (
        <>
          {/* displays this if password successfully updated */}
          <div className="settings_form">
            {passwordChanged ? (
              <>
                <div>Password has been updated</div>
                <button
                  className="settings_form_button"
                  onClick={resetPasswordForm}
                >
                  OK
                </button>
              </>
            ) : (
              <>
                {/* displays this if user has not attempted to change password yet */}
                <form onSubmit={changePassword}>
                  <div>Enter current password:</div>
                  <input type="password" ref={currentPasswordRef} required />
                  <div>Enter new password:</div>
                  <input type="password" ref={newPasswordRef} required />
                  <br />
                  <button type="submit" className="settings_form_button">
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {/* displays this if user has attempted to change password, but received an error */}
          <div className="settings_form">
            <div>Failed to change password:</div>
            <div style={{ color: "#e77929" }}>{errorMessage}</div>
            <button
              className="settings_form_button"
              onClick={() => setFailedToChangePassword(false)}
            >
              Try Again
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangePasswordForm;
