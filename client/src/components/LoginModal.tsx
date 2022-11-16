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

  // ensures that timer to auto-navigate to homepage does not run on initial mount
  const [initialMount, setInitialMount] = useState<boolean>(true);
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

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

  // attempts to log in user based on input username and password
  const loginAccount = async (e: any) => {
    e.preventDefault();
    // converts input username to lower case when checking for a match
    const loginDetails = {
      name: usernameRef.current.value.toLowerCase(),
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
      // if login is successful, stores account details within context
      if (userDetails.isAdmin) {
        context.setIsAdmin(true);
      }
      context.setIsLoggedIn(true);
      context.setUsername(usernameRef.current.value);
      context.setUserId(userDetails.id);
    } catch (err) {
      setFailedLogin(true);
      setError(err.message);
    }
  };

  // if successfully logged in, redirects user to the homepage after 5 seconds
  // does not run on initial mount
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
    <>
      {!failedLogin ? (
        <>
          <ReactModal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Login Modal"
          >
            {context.username ? (
              <>
                {/* displays auto-navigate message after user has successfully logged in */}
                <div onClick={() => navigate("/homepage")}>
                  <div>Successfully Logged In!</div>
                  <div>Click to navigate to main page</div>
                  <div>Auto-redirecting in 5 seconds...</div>
                </div>
              </>
            ) : (
              <>
                {/* displays login form if user is not logged in */}
                <img
                  src={redPandaIcon}
                  className="login_icon"
                  alt="panda icon"
                />
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
        </>
      ) : (
        <>
          {/* displays error message if user login failed */}
          <ReactModal
            isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Login Modal"
          >
            Login unsuccessful, check your username or password
            <br />
            <button
              className="modal_button"
              style={{ marginTop: "0.5rem" }}
              onClick={() => setFailedLogin(false)}
            >
              Try Again
            </button>
          </ReactModal>
        </>
      )}
    </>
  );
};

export default LoginModal;
