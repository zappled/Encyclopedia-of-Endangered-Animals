import React, { useContext, useRef, useState } from "react";
import Context from "../context/context";

const ChangeEmailForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);

  const emailRef = useRef<any>();
  const [emailChanged, setEmailChanged] = useState(false);
  const [failedToChangeEmail, setFailedToChangeEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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

  const resetEmailForm = () => {
    setEmailChanged(false);
    props.setOpenEmailForm(false);
  };

  return (
    <>
      {!failedToChangeEmail ? (
        <>
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
