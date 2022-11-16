import React, { useContext, useRef, useState } from "react";
import Context from "../context/context";

const ChangeEmailForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);

  // captures input to change email
  const emailRef = useRef<any>();
  // changes page display text after email is successfully changed
  const [emailChanged, setEmailChanged] = useState(false);
  // changes page display text if failed to change email
  const [failedToChangeEmail, setFailedToChangeEmail] = useState(false);
  // sets corresponding error message to display, if failed to change email
  const [errorMessage, setErrorMessage] = useState();

  // attempts to update account email after form onSubmit
  const changeEmail = async (e: any) => {
    e.preventDefault();
    const accountDetails = {
      uuid: context.userId,
      email: emailRef.current.value,
    };
    try {
      const res = await fetch(`http://localhost:5001/users/email`, {
        method: "PATCH",
        body: JSON.stringify(accountDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const result = await res.json();
      if (result.message === "Email has been changed") {
        setEmailChanged(true);
      } else {
        setFailedToChangeEmail(true);
        setErrorMessage(result);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // closes the email form and resets text back to default if opened again
  const resetEmailForm = () => {
    setEmailChanged(false);
    props.setOpenEmailForm(false);
  };

  return (
    <>
      {!failedToChangeEmail ? (
        <>
          {/* displays this if email successfully updated */}
          <div className="settings_form">
            {emailChanged ? (
              <>
                <div>Email has been updated</div>
                <button
                  className="settings_form_button"
                  onClick={resetEmailForm}
                >
                  OK
                </button>
              </>
            ) : (
              <>
                {/* displays this if user has not attempted to change email yet */}
                <form onSubmit={changeEmail}>
                  <div>Enter new email address:</div>
                  <input type="email" ref={emailRef} required />
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
          {/* displays this if user has attempted to change email, but received an error */}
          <div className="settings_form">
            <div>Failed to change email address:</div>
            <div style={{ color: "#e77929" }}>{errorMessage}</div>
            <button
              className="settings_form_button"
              onClick={() => setFailedToChangeEmail(false)}
            >
              Try Again
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeEmailForm;
