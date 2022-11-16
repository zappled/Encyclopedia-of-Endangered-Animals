import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const DeleteAccountForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  // on button click, deletes account based on user UUID saved in context

  const deleteAccount = async (e: any) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      const accountDetails = {
        uuid: context.userId,
      };
      try {
        const res = await fetch(`http://localhost:5001/users/delete`, {
          method: "DELETE",
          body: JSON.stringify(accountDetails),
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + bearer,
          },
        });
        const result = await res.json();
        // after successful delete, clears stored context values and navigates users back to login page
        context.setIsLoggedIn(false);
        context.setUsername("");
        context.setUserId("");
        context.setIsAdmin(false);
        navigate("/");
        if (res.status !== 200) {
          alert(result);
          return;
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {/* delete account form */}
      <div className="settings_form">
        <div style={{ width: "30%", marginLeft: "35%" }}>
          Are you sure you want to delete your account? This cannot be undone!
        </div>
        <button
          type="submit"
          className="settings_form_button"
          onClick={deleteAccount}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteAccountForm;
