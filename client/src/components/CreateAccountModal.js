import React, { useRef, useState, useMemo } from "react";
import ReactModal from "react-modal";
import Select from "react-select";
import countryList from "react-select-country-list";

const CreateAccountModal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#0b1f04",
      color: "#d9d9d9",
    },
  };

  ReactModal.setAppElement("#root");

  const closeModal = () => {
    props.setModalIsOpen(false);
  };

  // captures input from input form for creating appointment

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [category, setCategory] = useState("");
  const attendingWithRef = useRef();
  const orgRef = useRef();
  const addressRef = useRef();
  const [recurring, setRecurring] = useState("");

  // creates new object to be passed into fetch PUT function

  const createAccount = (e) => {
    e.preventDefault();
    // props.setApptBody({
    //   name: nameRef.current.value,
    //   description: descriptionRef.current.value,
    //   category: category,
    //   with_who: attendingWithRef.current.value,
    //   organization: orgRef.current.value,
    //   address: addressRef.current.value,
    //   recurring: recurring,
    // });
    console.log(value);
    props.setModalIsOpen(false);
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
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
              options={options}
              value={value}
              onChange={changeHandler}
            />
          </div>
          <br />
          <button className="modal_button" onClick={createAccount}>
            CREATE
          </button>
        </form>
      </ReactModal>
    </div>
  );
};

export default CreateAccountModal;
