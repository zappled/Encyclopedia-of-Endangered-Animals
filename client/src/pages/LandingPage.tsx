import React, { useState } from "react";
import ReactModal from "../components/LoginModal";
import CreateAccountModal from "../components/CreateAccountModal";

const LandingPage = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [apptBody, setApptBody] = useState({});

  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  return (
    <>
      <div className="landing_background">
        <h1>
          ENCYCLOPEDIA OF <span>ENDANGERED</span> ANIMALS
        </h1>
        <div className="button_container">
          <button onClick={openLoginModal} className="main_button">
            LOGIN
          </button>
          <button onClick={openCreateModal} className="main_button">
            CREATE ACCOUNT
          </button>
        </div>
      </div>
      <ReactModal
        modalIsOpen={loginModalIsOpen}
        setModalIsOpen={setLoginModalIsOpen}
      />
      <CreateAccountModal
        modalIsOpen={createModalIsOpen}
        setModalIsOpen={setCreateModalIsOpen}
        apptBody={apptBody}
        setApptBody={setApptBody}
      />
    </>
  );
};

export default LandingPage;
