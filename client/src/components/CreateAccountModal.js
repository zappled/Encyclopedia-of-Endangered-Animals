import React, { useRef, useState, useMemo } from "react";
import ReactModal from "react-modal";
import CreateAccountForm from "./CreateAccountForm";
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
    setAccountCreated(false);
  };

  // updates modal content to show 'account successfully created' message

  const [accountCreated, setAccountCreated] = useState(false);

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
    setAccountCreated(true);
  };

  const [value, setValue] = useState("");

  return (
    <div>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Account Modal"
      >
        {accountCreated ? (
          <>
            <div>Account successfully created!</div>
            <div>You may proceed to login</div>
          </>
        ) : (
          <CreateAccountForm
            createAccount={createAccount}
            value={value}
            setValue={setValue}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default CreateAccountModal;
