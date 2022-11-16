import React, { useContext, useRef, useState, useEffect } from "react";
import Context from "../context/context";

const EditSpotlightForm = (props) => {
  const [error, setError] = useState(null);
  const context = useContext(Context);

  // stores user's current spotlight list after fetch function is completed
  const [user, setUser] = useState([]);

  // on initial mount, fetches user spotlight data based on their UUID
  const fetchUserById = async () => {
    const userId = { id: context.userId };
    try {
      const res = await fetch(`http://localhost:5001/search/users/id`, {
        method: "POST",
        body: JSON.stringify(userId),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const data = await res.json();
      setUser(data[0].spotlight);
    } catch (err) {
      console.log(err);
    }
  };

  // fetches user data on initial mount
  useEffect(() => {
    fetchUserById();
  }, []);

  // removes animal from user spotlight list based on animal name
  const removeEntry = async (input: any) => {
    const inputName = { name: input };
    if (
      window.confirm(
        "Are you sure you want to delete this animal from your spotlight?"
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:5001/search/animals/name`,
          {
            method: "POST",
            body: JSON.stringify(inputName),
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer " + bearer,
            },
          }
        );

        const data = await response.json();
        const userDetails = { uuid: context.userId, animalId: data[0].id };

        const res = await fetch(`http://localhost:5001/users/spotlight`, {
          method: "DELETE",
          body: JSON.stringify(userDetails),
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + bearer,
          },
        });
        if (res.status !== 200) {
          throw new Error("Something went wrong!");
        }
        await res.json();
        fetchUserById();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {/* displays this if user has at least 1 animal in their spotlight list */}
      <div className="settings_form">
        {user[0] !== null ? (
          user.map((entry: any) => {
            return (
              <>
                <div>
                  {entry}{" "}
                  {
                    <span
                      style={{ color: "#e77929", marginLeft: "0.5rem" }}
                      onClick={() => removeEntry(entry)}
                    >
                      [x]
                    </span>
                  }
                </div>
              </>
            );
          })
        ) : (
          // displays this if user's animal spotlight list is currently empty
          <div>Your animal spotlight list is currently empty</div>
        )}
      </div>
    </>
  );
};

export default EditSpotlightForm;
