import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { json } from "stream/consumers";
import Navbar from "../common/Navbar";
import EditDatabaseModal from "../components/EditDatabaseModal";
import Context from "../context/context";

const AnimalData = () => {
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState({});
  const currentPage: string = "Animal Database Entries";
  const [animals, setAnimals] = useState([]);
  const [firstMountDelete, setFirstMountDelete] = useState(true);
  const [firstMountUpdate, setFirstMountUpdate] = useState(true);
  const context = useContext(Context);
  const navigate = useNavigate();
  const [animalEntry, setAnimalEntry] = useState([]);
  const [updatedEntryBody, setUpdatedEntryBody] = useState({});

  useEffect(() => {
    context.isLoggedIn ? fetchAnimals() : navigate("/");
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      setAnimals(data);
    } catch (err) {
      console.log(err);
    }
  };

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
        // if (res.status !== 200) {
        //   throw new Error("Something went wrong!");
        // }
        // await res.json();
        fetchAnimals();
        console.log("entry deleted");
      } catch (err) {
        setError(err.message);
      }
    }
  };

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

  // for DELETE
  useEffect(() => {
    if (firstMountDelete === true) {
      setFirstMountDelete(false);
    } else {
      deleteAnimal();
    }
  }, [deleteId]);

  // for UPDATE
  useEffect(() => {
    if (firstMountUpdate === true) {
      setFirstMountUpdate(false);
    } else {
      updateAnimal();
    }
  }, [updatedEntryBody]);

  // controls toggling of modal for updating appointment

  const [editDatabaseModalIsOpen, setEditDatabaseModalIsOpen] = useState(false);

  // const openEditDatabaseModal = () => {
  //   setAnimalEntry(entry);
  //   setEditDatabaseModalIsOpen(true);
  // };

  return (
    <>
      {context.isAdmin ? (
        <>
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
        <div>Administrator rights is required to view this page</div>
      )}
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
