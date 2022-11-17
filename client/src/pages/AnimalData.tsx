import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";
import Navbar from "../common/Navbar";
import EditDatabaseModal from "../components/EditDatabaseModal";
import Context from "../context/context";

const AnimalData = () => {
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets id of animal to be deleted from database
  const [deleteId, setDeleteId] = useState<{}>({});
  // sets current page name on navbar
  const currentPage: string = "Animal Database Entries";
  // sets array of animal data after fetch function has completed
  const [animals, setAnimals] = useState<[]>([]);
  // ensures delete useEffect does not run on initial mount
  const [firstMountDelete, setFirstMountDelete] = useState<boolean>(true);
  // ensures update useEffect does not run on initial mount
  const [firstMountUpdate, setFirstMountUpdate] = useState<boolean>(true);
  // sets animal default data values when corresponding modal is opened
  const [animalEntry, setAnimalEntry] = useState<[]>([]);
  // sets the entry body to update animal data entry
  const [updatedEntryBody, setUpdatedEntryBody] = useState<{}>({});

  // auto-navigates user back to login page if not logged in
  // fetches animal data if logged in
  useEffect(() => {
    context.isLoggedIn ? fetchAnimals() : navigate("/");
  }, []);

  // fetches all animal data from the database
  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      setAnimals(data);
    } catch (err) {
      console.log(err);
    }
  };

  // deletes animal entry based on animal ID
  const deleteAnimal = async () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const res = await fetch(`http://localhost:5001/search/animals`, {
          method: "DELETE",
          body: JSON.stringify(deleteId),
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + bearer,
          },
        });
        fetchAnimals();
        console.log("entry deleted");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // updates animal entry based on entry body and animal ID
  const updateAnimal = async () => {
    console.log(updatedEntryBody);
    try {
      const res = await fetch(`http://localhost:5001/update/animal`, {
        method: "PATCH",
        body: JSON.stringify(updatedEntryBody),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      console.log(res);
      fetchAnimals();
      console.log("entry updated");
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // for DELETE, does not run on initial mount
  useEffect(() => {
    if (firstMountDelete === true) {
      setFirstMountDelete(false);
    } else {
      deleteAnimal();
    }
  }, [deleteId]);

  // for UPDATE, does not run on initial mount
  useEffect(() => {
    if (firstMountUpdate === true) {
      setFirstMountUpdate(false);
    } else {
      updateAnimal();
    }
  }, [updatedEntryBody]);

  // controls toggling of modal for updating entry

  const [editDatabaseModalIsOpen, setEditDatabaseModalIsOpen] = useState(false);

  return (
    <>
      {context.isAdmin ? (
        <>
          {/* data table with edit/delete buttons only appears if logged in & user is admin */}
          <Navbar currentPage={currentPage} />
          <table className="animal_data_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Conservation Status</th>
                <th>Region</th>
                <th>Population</th>
                <th>Image</th>
                <th>Threats</th>
                <th>Habitats</th>
              </tr>
            </thead>
            {/* maps animal database data into table format */}
            {animals.map((entry: any, key: any) => {
              return (
                <>
                  <tbody key={key}>
                    <tr>
                      <td>{entry.id}</td>
                      <td>
                        {entry.name}
                        <br />
                        <button
                          className="edit_database_button"
                          onClick={() => {
                            setAnimalEntry(entry);
                            setEditDatabaseModalIsOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="edit_database_button"
                          onClick={() => setDeleteId({ id: entry.id })}
                        >
                          Delete
                        </button>
                      </td>
                      <td>{entry.class}</td>
                      <td>{entry.conservation_status}</td>
                      <td>{entry.region}</td>
                      <td>{entry.population}</td>
                      <td>{entry.image}</td>
                      <td>{new Set(entry.threats)}</td>
                      <td>{new Set(entry.habitats)}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </>
      ) : (
        // shows error if user is logged in but is not admin
        <div>Administrator rights is required to view this page</div>
      )}
      {/* passes individual animal entry data into each modal */}
      <EditDatabaseModal
        editDatabaseModalIsOpen={editDatabaseModalIsOpen}
        setEditDatabaseModalIsOpen={setEditDatabaseModalIsOpen}
        entry={animalEntry}
        setUpdatedEntryBody={setUpdatedEntryBody}
        updatedEntryBody={updatedEntryBody}
      />
    </>
  );
};

export default AnimalData;
