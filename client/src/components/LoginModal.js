import { buildQueries } from "@testing-library/react";
import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

const LoginModal = (props) => {
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

  return (
    <div>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2 className="modal_header">Login</h2>
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
          <br />
          <button className="modal_button">LOGIN</button>
        </form>
      </ReactModal>
    </div>
  );
};

export default LoginModal;
