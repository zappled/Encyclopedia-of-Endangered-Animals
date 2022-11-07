import React from "react";
import Select from "react-select";
import { useRef, useState, useMemo } from "react";
import countryList from "react-select-country-list";

const CreateAccountForm = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    props.setValue(value);
  };

  return (
    <>
      <h2 className="modal_header">Create Your Account</h2>
      <div>Fill in the following details:</div>
      <form className="create_account_form">
        <div className="input_container">
          <div className="modal_label">
            <label>Username</label>
          </div>
          <input type="text" ref={usernameRef} required />
        </div>
        <div className="input_container">
          <div className="modal_label">
            <label>Password</label>
          </div>
          <input type="text" ref={passwordRef} required />
        </div>
        <div className="input_container">
          <div className="modal_label">
            <label>Email</label>
          </div>
          <input type="text" ref={emailRef} required />
        </div>
        <div className="input_container">
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
        <button className="modal_button" onClick={props.createAccount}>
          CREATE
        </button>
      </form>
    </>
  );
};

export default CreateAccountForm;
