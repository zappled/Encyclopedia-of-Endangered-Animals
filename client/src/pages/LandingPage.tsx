import React, { useState } from "react";
import ReactModal from "../components/LoginModal";
import CreateAccountModal from "../components/CreateAccountModal";

import Context from "../context/context";

const LandingPage = () => {
  // toggles display of login or create account modal
  const [loginModalIsOpen, setLoginModalIsOpen] = useState<boolean>(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);

  // opens login modal on button click
  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  // opens create account modal on button click
  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  return (
    <>
      {/* default landing page when user is not logged in */}
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
      />
    </>
  );
};

export default LandingPage;
