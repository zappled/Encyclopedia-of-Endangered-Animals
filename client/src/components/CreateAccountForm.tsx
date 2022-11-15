import React from "react";
import Select from "react-select";
import { useRef, useState, useMemo } from "react";
import countryList from "react-select-country-list";

const CreateAccountForm = (props) => {
  const [error, setError] = useState(null);
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value: string) => {
    props.setValue(value);
  };

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
        console.log(user);
        alert(JSON.stringify(user[0].msg));
        return;
      } else if (res.status === 401) {
        alert(user);
        return;
      }
    } catch (err) {
      setError(err.message);
    }
    props.setAccountCreated(true);
  };

  return (
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
  );
};

export default CreateAccountForm;
