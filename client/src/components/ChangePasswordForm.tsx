import React, { useContext, useRef, useState } from "react";
import Context from "../context/context";

const ChangePasswordForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);

  const currentPasswordRef = useRef<any>();
  const newPasswordRef = useRef<any>();
  const [passwordChanged, setPasswordChanged] = useState(false);

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
      if (res.status !== 200) {
        alert(result);
        return;
      }
      if (result.message === "Password has been changed") {
        setPasswordChanged(true);
      } else {
        alert("Failed to change password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPasswordForm = () => {
    setPasswordChanged(false);
    props.setOpenPasswordForm(false);
  };

  return (
    <>
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
  );
};

export default ChangePasswordForm;
