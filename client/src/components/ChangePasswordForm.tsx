import React, { useContext, useRef, useState } from "react";
import Context from "../context/context";

const ChangePasswordForm = () => {
  const [error, setError] = useState(null);
  const currentPasswordRef = useRef<any>();
  const newPasswordRef = useRef<any>();
  const context = useContext(Context);

  const changePassword = async (e: any) => {
    e.preventDefault();
    const accountDetails = {
      uuid: context.userId,
      currentPassword: currentPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };
    try {
      const res = await fetch(`http://localhost:5001/users/password`, {
        method: "PATCH",
        body: JSON.stringify(accountDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const user = await res.json();
      if (res.status !== 200) {
        alert(user);
        return;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="settings_form">
        <form>
          <div>Enter current password:</div>
          <input type="password" ref={currentPasswordRef} />
          <div>Enter new password:</div>
          <input type="password" ref={newPasswordRef} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
