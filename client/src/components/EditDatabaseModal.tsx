import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

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

  //   const dateRef = useRef();
  //   const startTimeRef = useRef();
  //   const endTimeRef = useRef();
  //   const nameRef = useRef();
  //   const descriptionRef = useRef();
  //   const [category, setCategory] = useState(props.entry.category);
  //   const attendingWithRef = useRef();
  //   const orgRef = useRef();
  //   const addressRef = useRef();
  //   const [recurring, setRecurring] = useState(props.entry.recurring);

  //   const selectCategory = (e) => {
  //     setCategory(e.target.value);
  //   };

  //   const selectRecurring = (e) => {
  //     setRecurring(e.target.value);
  //   };

  // creates new object to be passed into fetch POST function

  const updateApptObject = (e) => {
    e.preventDefault();
    props.setUpdatedApptBody({
      //   date: dateRef.current.value,
      //   time: startTimeRef.current.value,
      //   time_end: endTimeRef.current.value,
      //   name: nameRef.current.value,
      //   description: descriptionRef.current.value,
      //   category: category,
      //   with_who: attendingWithRef.current.value,
      //   organization: orgRef.current.value,
      //   address: addressRef.current.value,
      //   recurring: recurring,
      //   id: props.entry._id,
    });
    props.setEditDatabaseModalIsOpen(false);
  };

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
            // ref={dateRef}
            // defaultValue={props.entry.date.slice(0, 10)}
            required
          />
          <br />
          <label>Class</label>
          <input
            type="text"
            // ref={startTimeRef}
            // defaultValue={props.entry.time}
            required
          />
          <br />
          <label>Conservation Status</label>
          <select
            // onChange={selectCategory}
            // defaultValue={props.entry.category}
            required
          >
            <option>Select category</option>
            <option value="personal">Vulnerable</option>
            <option value="work">Endangered</option>
            <option value="medical">Critically Endangered</option>
          </select>
          <br />
          <label>Region</label>
          <input
            type="text"
            // ref={nameRef}
            // defaultValue={props.entry.name}
            required
          />
          <br />
          <label>Population</label>
          <input
            type="text"
            // ref={descriptionRef}
            // defaultValue={props.entry.description}
          />
          <br />
          <label>Image</label>
          <input
            type="text"
            // ref={nameRef}
            // defaultValue={props.entry.name}
            required
          />
          <br />
          <label>Threats</label>
          <input
            type="text"
            // ref={addressRef}
            // defaultValue={props.entry.address}
          />
          <br />
          <label>Habitats</label>
          <input
            type="text"
            // ref={addressRef}
            // defaultValue={props.entry.address}
          />
          <br />
          <button onClick={updateApptObject}>Submit</button>
        </form>
      </ReactModal>
    </div>
  );
};

export default EditDatabaseModal;
