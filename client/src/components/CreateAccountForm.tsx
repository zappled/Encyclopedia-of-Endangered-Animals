import React from "react";
import Select from "react-select";
import { useRef, useState, useMemo } from "react";
import countryList from "react-select-country-list";

const CreateAccountForm = (props) => {
  const [error, setError] = useState(null);

  // captures input to create account
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();

  // used to populate dropdown menu with all countries in component database
  const options = useMemo(() => countryList().getData(), []);

  // changes page display text if failed to create account
  const [failedCreateAccount, setFailedCreateAccount] =
    useState<boolean>(false);
  // sets corresponding error message to display, if failed to create account
  const [errorMessage, setErrorMessage] = useState("");

  // dynamically updates value of selected country in dropdown menu
  const changeHandler = (value: string) => {
    props.setValue(value);
  };

  // attempts to create account after button onClick
  const createAccount = async (e: any) => {
    e.preventDefault();
    const accountDetails = {
      name: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      country: props.value.value,
    };
    try {
      const res = await fetch(`http://localhost:5001/users`, {
        method: "PUT",
        body: JSON.stringify(accountDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const user = await res.json();
      if (res.status === 400) {
        setFailedCreateAccount(true);
        setErrorMessage(user[0].msg);
        return;
      } else if (res.status === 401) {
        setFailedCreateAccount(true);
        setErrorMessage(user);
        return;
      }
    } catch (err) {
      setError(err.message);
    }
    props.setAccountCreated(true);
  };

  return (
    <>
    {/* displays by default when user has not attempted to create account yet */}
      {!failedCreateAccount ? (
        <>
          <h2 className="modal_header">Create Your Account</h2>
          <div>Fill in the following details:</div>
          <form className="create_account_form">
            <div className="input_container_create">
              <div className="modal_label">
                <label>Username</label>
              </div>
              <input type="text" ref={usernameRef} required />
            </div>
            <div className="input_container_create">
              <div className="modal_label">
                <label>Password</label>
              </div>
              <input type="password" ref={passwordRef} required />
            </div>
            <div className="input_container_create">
              <div className="modal_label">
                <label>Email</label>
              </div>
              <input type="email" ref={emailRef} required />
            </div>
            <div className="input_container_create">
              <div className="modal_label">
                <label>Country</label>
              </div>
              <Select
                className="country_selector"
                onChange={changeHandler}
                options={options}
                value={props.value}
              />
            </div>
            <br />
            <button className="modal_button_create" onClick={createAccount}>
              CREATE
            </button>
          </form>
        </>
      ) : (
        <>
        {/* displays if user receives error when trying to create account */}
          <div>Failed to create account</div>
          <div>
            <span style={{ color: "#e77929" }}>{errorMessage}</span>
          </div>
          <button
            className="modal_button"
            style={{ marginTop: "0.5rem" }}
            onClick={() => setFailedCreateAccount(false)}
          >
            Try Again
          </button>
        </>
      )}
    </>
  );
};

export default CreateAccountForm;
