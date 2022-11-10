import React, { useState, useEffect } from "react";
import { json } from "stream/consumers";
import Navbar from "../common/Navbar";
import EditDatabaseModal from "../components/EditDatabaseModal";

const AnimalData = () => {
  const currentPage: string = "Animal Database Entries";
  const [animals, setAnimals] = useState([]);

  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      setAnimals(data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetches data from animal database on initial mount
  useEffect(() => {
    fetchAnimals();
  }, []);

  // controls toggling of modal for updating appointment

  const [editDatabaseModalIsOpen, setEditDatabaseModalIsOpen] = useState(false);

  const openEditDatabaseModal = () => {
    setEditDatabaseModalIsOpen(true);
  };

  return (
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
                      onClick={openEditDatabaseModal}
                    >
                      Edit
                    </button>
                    <button className="edit_database_button">Delete</button>
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

      <EditDatabaseModal
        editDatabaseModalIsOpen={editDatabaseModalIsOpen}
        setEditDatabaseModalIsOpen={setEditDatabaseModalIsOpen}
        // entry={props.entry}
        // setUpdatedApptBody={props.setUpdatedApptBody}
        // updatedApptBody={props.updatedApptBody}
      />
    </>
  );
};

export default AnimalData;
