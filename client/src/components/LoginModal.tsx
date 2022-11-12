import { buildQueries } from "@testing-library/react";
import React, { useContext, useRef, useState, useEffect } from "react";
import ReactModal from "react-modal";
import redPandaIcon from "../images/icons/animals/icons8_redpanda_lightgrey.png";
import { Navigate, useNavigate } from "react-router-dom";

import Context from "../context/context";

const LoginModal = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();
  const [initialMount, setInitialMount] = useState(true);

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

  // captures input from input form for logging in

  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const loginAccount = async (e: any) => {
    e.preventDefault();
    const loginDetails = {
      name: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await fetch(`http://localhost:5001/login`, {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const userDetails = await res.json();
      if (userDetails.isAdmin) {
        context.setIsAdmin(true);
      }
      context.setIsLoggedIn(true);
      context.setUserId(usernameRef.current.value);
      console.log("logged in successfully");
    } catch (err) {
      alert("Login unsuccessful");
      setError(err.message);
    }
  };

  useEffect(() => {
    if (initialMount === true) {
      setInitialMount(false);
    } else {
      const timer = setTimeout(() => {
        navigate("/homepage");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [context.isLoggedIn]);

  return (
    <div>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        {context.userId ? (
          <>
            <div onClick={() => navigate("/homepage")}>
              <div>Successfully Logged In!</div>
              <div>Click to navigate to main page</div>
              <div>Auto-redirecting in 5 seconds</div>
            </div>
          </>
        ) : (
          <>
            <img src={redPandaIcon} className="login_icon" alt="panda icon" />
            <form className="create_account_form" onSubmit={loginAccount}>
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
                <input type="password" ref={passwordRef} required />
              </div>
              <br />
              <button className="modal_button" type="submit">
                LOGIN
              </button>
            </form>
          </>
        )}
      </ReactModal>
    </div>
  );
};

export default LoginModal;
