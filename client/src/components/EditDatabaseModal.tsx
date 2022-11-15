import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import { arrayBuffer } from "stream/consumers";

const EditDatabaseModal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  ReactModal.setAppElement("#root");

  const closeModal = () => {
    props.setEditDatabaseModalIsOpen(false);
  };

  // captures input from input form for updating appointment

  const nameRef = useRef<HTMLInputElement>(null);
  const classRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const populationRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [conservationStatus, setConservationStatus] = useState("");
  const [habitats, setHabitats] = useState([]);
  const [threats, setThreats] = useState([]);

  const selectConservationStatus = (e) => {
    setConservationStatus(e.target.value);
  };

  //   const selectRecurring = (e) => {
  //     setRecurring(e.target.value);
  //   };

  // creates new object to be passed into fetch POST function

  const selectHabitats = (e) => {
    const refreshHabitats = [];
    if (e.target.checked) {
      setHabitats([...refreshHabitats, e.target.value]);
    } else if (!e.target.checked) {
      const selected = [...habitats];
      const index = selected.indexOf(e.target.value);
      if (index !== -1) {
        selected.splice(index, 1);
        setHabitats(selected);
      }
    }
  };

  const selectThreats = (e) => {
    setThreats([]);
    if (e.target.checked) {
      setThreats([...threats, e.target.value]);
    } else if (!e.target.checked) {
      const selected = [...threats];
      const index = selected.indexOf(e.target.value);
      if (index !== -1) {
        selected.splice(index, 1);
        setThreats(selected);
      }
    }
  };

  const updateEntry = (e) => {
    // e.preventDefault();
    console.log(habitats);
    props.setUpdatedEntryBody({
      name: nameRef.current.value,
      conservation_status: conservationStatus,
      animalClass: classRef.current.value,
      region: regionRef.current.value,
      population: populationRef.current.value,
      image: imageRef.current.value,
      id: props.entry.id,
    });
    props.setEditDatabaseModalIsOpen(false);
  };

  console.log(props.entry.habitats);
  console.log(props.entry.threats);

  return (
    <div>
      <ReactModal
        isOpen={props.editDatabaseModalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Update Entry</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            ref={nameRef}
            defaultValue={props.entry.name}
            required
          />
          <br />
          <label>Class</label>
          <input
            type="text"
            ref={classRef}
            defaultValue={props.entry.class}
            required
          />
          <br />
          <label>Conservation Status</label>
          <select
            onChange={selectConservationStatus}
            defaultValue={props.entry.conservation_status}
            required
          >
            <option>Select option</option>
            <option value="VULNERABLE">Vulnerable</option>
            <option value="ENDANGERED">Endangered</option>
            <option value="CRITICALLY ENDANGERED">Critically Endangered</option>
          </select>
          <br />
          <label>Region</label>
          <input
            type="text"
            ref={regionRef}
            defaultValue={props.entry.region}
            required
          />
          <br />
          <label>Population</label>
          <input
            type="text"
            ref={populationRef}
            defaultValue={props.entry.population}
          />
          <br />
          <label>Image</label>
          <input
            type="text"
            ref={imageRef}
            defaultValue={props.entry.image}
            required
          />
          <br />
          <label>Threats</label>
          <br />
          <input
            type="checkbox"
            id="human_intrusion"
            name="threats"
            value="1"
            onChange={selectThreats}
          />
          <label htmlFor="human_intrusion">Human Intrusion</label>
          <br />
          <input
            type="checkbox"
            id="biological"
            name="threats"
            value="2"
            onChange={selectThreats}
          />
          <label htmlFor="biological">Biological Resource Use</label>
          <br />
          <input
            type="checkbox"
            id="invasive"
            name="threats"
            value="3"
            onChange={selectThreats}
          />
          <label htmlFor="invasive">Invasive Species And Diseases</label>
          <br />
          <input
            type="checkbox"
            id="pollution"
            name="threats"
            value="4"
            onChange={selectThreats}
          />
          <label htmlFor="pollution">Pollution</label>
          <br />
          <input
            type="checkbox"
            id="climate_change"
            name="threats"
            value="5"
            onChange={selectThreats}
          />
          <label htmlFor="climate_change">Climate Change</label>
          <br />
          <input
            type="checkbox"
            id="geological"
            name="threats"
            value="6"
            onChange={selectThreats}
          />
          <label htmlFor="geological">Geological Events</label>
          <br />
          <input
            type="checkbox"
            id="others"
            name="threats"
            value="7"
            onChange={selectThreats}
          />
          <label htmlFor="others">Others</label>
          <br />
          <label>Habitats</label>
          <br />
          <input
            type="checkbox"
            id="forest"
            name="habitats"
            value="1"
            onChange={selectHabitats}
          />
          <label htmlFor="forest" style={{ marginRight: "0.5rem" }}>
            Forest
          </label>
          <input
            type="checkbox"
            id="savanna"
            name="habitats"
            value="2"
            onChange={selectHabitats}
          />
          <label htmlFor="savanna" style={{ marginRight: "0.5rem" }}>
            Savanna
          </label>
          <input
            type="checkbox"
            id="shrubland"
            name="habitats"
            value="3"
            onChange={selectHabitats}
          />
          <label htmlFor="shrubland" style={{ marginRight: "0.5rem" }}>
            Shrubland
          </label>
          <br />
          <input
            type="checkbox"
            id="grassland"
            name="habitats"
            value="4"
            onChange={selectHabitats}
          />
          <label htmlFor="grassland" style={{ marginRight: "0.5rem" }}>
            Grassland
          </label>
          <input
            type="checkbox"
            id="wetlands"
            name="habitats"
            value="5"
            onChange={selectHabitats}
          />
          <label htmlFor="wetlands" style={{ marginRight: "0.5rem" }}>
            Wetlands
          </label>
          <input
            type="checkbox"
            id="rocky_areas"
            name="habitats"
            value="6"
            onChange={selectHabitats}
          />
          <label htmlFor="rocky_areas" style={{ marginRight: "0.5rem" }}>
            Rocky Areas
          </label>
          <br />
          <input
            type="checkbox"
            id="cave"
            name="habitats"
            value="7"
            onChange={selectHabitats}
          />
          <label htmlFor="cave" style={{ marginRight: "0.5rem" }}>
            Caves/Subterranean
          </label>
          <input
            type="checkbox"
            id="desert"
            name="habitats"
            value="8"
            onChange={selectHabitats}
          />
          <label htmlFor="desert" style={{ marginRight: "0.5rem" }}>
            Desert
          </label>
          <br />
          <input
            type="checkbox"
            id="marine"
            name="habitats"
            value="9"
            onChange={selectHabitats}
          />
          <label htmlFor="marine" style={{ marginRight: "0.5rem" }}>
            Marine
          </label>
          <input
            type="checkbox"
            id="terrestrial"
            name="habitats"
            value="10"
            onChange={selectHabitats}
          />
          <label htmlFor="terrestrial">Terrestrial</label>
          <br />
          <button type="button" onClick={updateEntry}>
            Submit
          </button>
        </form>
      </ReactModal>
    </div>
  );
};

export default EditDatabaseModal;
