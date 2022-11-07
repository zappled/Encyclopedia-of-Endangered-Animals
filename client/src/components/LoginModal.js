import React, { useRef, useState } from "react";
import ReactModal from "react-modal";

const LoginModal = (props) => {
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
    props.setModalIsOpen(false);
  };

  // captures input from input form for creating appointment

  const dateRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [category, setCategory] = useState("");
  const attendingWithRef = useRef();
  const orgRef = useRef();
  const addressRef = useRef();
  const [recurring, setRecurring] = useState("");

  const selectCategory = (e) => {
    setCategory(e.target.value);
  };

  const selectRecurring = (e) => {
    setRecurring(e.target.value);
  };

  // creates new object to be passed into fetch PUT function

  const createApptObject = (e) => {
    e.preventDefault();
    props.setApptBody({
      date: dateRef.current.value,
      time: startTimeRef.current.value,
      time_end: endTimeRef.current.value,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: category,
      with_who: attendingWithRef.current.value,
      organization: orgRef.current.value,
      address: addressRef.current.value,
      recurring: recurring,
    });
    props.setModalIsOpen(false);
  };

  return (
    <div>
      <ReactModal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <h2>Create New Appointment</h2>
        <div>Add the following details:</div>
        <form>
          <label>Date</label>
          <input type="text" ref={dateRef} placeholder="YYYY-MM-DD" required />
          <br />
          <label>Start Time</label>
          <input
            placeholder="24 hour format"
            type="text"
            ref={startTimeRef}
            required
          />
          <br />
          <label>End Time</label>
          <input
            placeholder="24 hour format"
            type="text"
            ref={endTimeRef}
            required
          />
          <br />
          <label>Name</label>
          <input type="text" ref={nameRef} required />
          <br />
          <label>Description</label>
          <input type="text" ref={descriptionRef} />
          <br />
          <label>Category</label>
          <select onChange={selectCategory}>
            <option value="others">Select category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="medical">Medical</option>
            <option value="others">Others</option>
          </select>
          <br />
          <label>Attending with:</label>
          <input type="text" ref={attendingWithRef} />
          <br />
          <label>Organization</label>
          <input type="text" ref={orgRef} />
          <br />
          <label>Address</label>
          <input type="text" ref={addressRef} />
          <br />
          <label>Recurring:</label>
          <select onChange={selectRecurring}>
            <option value="no">No</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Montly</option>
          </select>
          <br />
          <button onClick={createApptObject}>Submit</button>
        </form>
        <div>Click anywhere outside to close window</div>
      </ReactModal>
    </div>
  );
};

export default LoginModal;
