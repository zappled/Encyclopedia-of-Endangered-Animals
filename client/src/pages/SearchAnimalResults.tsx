import React, { useState, useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CCarouselCaption } from "@coreui/react";
import { CImage } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";

import regionIcon from "../images/icons/data/icons8-globe_lightgrey.png";
import threatsIcon from "../images/icons/data/icons8-sword.png";
import populationIcon from "../images/icons/data/icons8-multiple-stars.png";
import habitatIcon from "../images/icons/data/icons8-oak-tree_lightgrey.png";

import birdIcon from "../images/icons/animals/icons8_parrot_lightgrey.png";
import mammalIcon from "../images/icons/animals/icons8_redpanda_lightgrey.png";
import reptileIcon from "../images/icons/animals/icons8-alligator.png";
import amphibianIcon from "../images/icons/animals/icons8-frog.png";
import fishIcon from "../images/icons/animals/icons8-whole-fish.png";

const SearchAnimalResults = () => {
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  // obtain correct animal ID by slicing the url string
  const animalId: string = window.location.href.slice(37);
  // sets animal data that corresponds with the sliced animal ID
  const [animal, setAnimal] = useState<any>([]);
  // sets current page name on navbar based on the fetched animal name
  const [currentPage, setCurrentPage] = useState<string>("");

  // sets animal data based on what has been fetched
  const [conservationStatus, setConservationStatus] = useState<string>("");
  const [conservationIcon, setConservationIcon] = useState<string>("");
  const [habitats, setHabitats] = useState<any>([]);
  const [threats, setThreats] = useState<any>([]);
  const [classIcon, setClassIcon] = useState<string>("");

  // toggles to show a different message whenever an animal is either added or removed from user's animal spotlight
  const [removedSpotlight, setRemovedSpotlight] = useState<boolean>(false);
  const [addedSpotlight, setAddedSpotlight] = useState<boolean>(false);

  // auto-navigates user back to login page if not logged in
  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

  // fetches a random animal on initial mount, based on ID sliced from url
  const fetchAnimalById = async () => {
    setHabitats([]);
    setThreats([]);
    try {
      const res = await fetch(
        `http://localhost:5001/search/animals/${animalId}`
      );
      const data = await res.json();
      setAnimal(data);
      setCurrentPage(data[0].name);
      const dataStatus = data[0].conservation_status;
      if (dataStatus === "CRITICALLY ENDANGERED") {
        setConservationStatus("Critically Endangered");
        setConservationIcon(criticallyEndangeredIcon);
      } else if (dataStatus === "ENDANGERED") {
        setConservationStatus("Endangered");
        setConservationIcon(endangeredIcon);
      } else if (dataStatus === "VULNERABLE") {
        setConservationStatus("Vulnerable");
        setConservationIcon(vulnerableIcon);
      }
      const dataClass = data[0].class;
      if (dataClass === "Mammal") {
        setClassIcon(mammalIcon);
      } else if (dataClass === "Amphibian") {
        setClassIcon(amphibianIcon);
      } else if (dataClass === "Reptile") {
        setClassIcon(reptileIcon);
      } else if (dataClass === "Bird") {
        setClassIcon(birdIcon);
      } else if (dataClass === "Ray-finned Fish") {
        setClassIcon(fishIcon);
      }
      if (data[0].habitats.includes("Forest")) {
        // populates the habitats array based on animal data
        setHabitats((arr) => [...arr, "Forest"]);
      }
      if (data[0].habitats.includes("Savanna")) {
        setHabitats((arr) => [...arr, "Savanna"]);
      }
      if (data[0].habitats.includes("Shrubland")) {
        setHabitats((arr) => [...arr, "Shrubland"]);
      }
      if (data[0].habitats.includes("Grassland")) {
        setHabitats((arr) => [...arr, "Grassland"]);
      }
      if (data[0].habitats.includes("Wetlands")) {
        setHabitats((arr) => [...arr, "Wetlands"]);
      }
      if (data[0].habitats.includes("Rocky Areas")) {
        setHabitats((arr) => [...arr, "Rocky Areas"]);
      }
      if (data[0].habitats.includes("Caves/Subterranean")) {
        setHabitats((arr) => [...arr, "Caves/Subterranean"]);
      }
      if (data[0].habitats.includes("Desert")) {
        setHabitats((arr) => [...arr, "Desert"]);
      }
      if (data[0].habitats.includes("Marine")) {
        setHabitats((arr) => [...arr, "Marine"]);
      }
      if (data[0].habitats.includes("Terrestrial")) {
        setHabitats((arr) => [...arr, "Terrestrial"]);
      }
      // populates the threats array based on animal data
      if (data[0].threats.includes("Human Intrusion")) {
        setThreats((arr) => [...arr, "Human Intrusion"]);
      }
      if (data[0].threats.includes("Biological Resource Use")) {
        setThreats((arr) => [...arr, "Biological Resource Use"]);
      }
      if (data[0].threats.includes("Invasive Species and Diseases")) {
        setThreats((arr) => [...arr, "Invasive Species and Diseases"]);
      }
      if (data[0].threats.includes("Pollution")) {
        setThreats((arr) => [...arr, "Pollution"]);
      }
      if (data[0].threats.includes("Climate Change")) {
        setThreats((arr) => [...arr, "Climate Change"]);
      }
      if (data[0].threats.includes("Geological Events")) {
        setThreats((arr) => [...arr, "Geological Events"]);
      }
      if (data[0].threats.includes("Others")) {
        setThreats((arr) => [...arr, "Others"]);
      }
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  // fetches data from animal database on initial mount
  useEffect(() => {
    fetchAnimalById();
  }, []);

  // either adds or remove the animal from user's animal spotlight, depending on whether the animal is already on their list
  const setSpotlight = async (e: any) => {
    e.preventDefault();
    setAddedSpotlight(false);
    setRemovedSpotlight(false);
    const accountDetails = {
      uuid: context.userId,
      animalId: animalId,
    };
    try {
      const res = await fetch(`http://localhost:5001/users/spotlight`, {
        method: "PATCH",
        body: JSON.stringify(accountDetails),
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + bearer,
        },
      });
      const result = await res.json();
      if (res.status !== 200) {
        alert(result);
        return;
      }
      if (result.includes("added")) {
        setAddedSpotlight(true);
      } else if (result.includes("removed")) {
        setRemovedSpotlight(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <CCarousel
        className="banner_container"
        style={{ marginBottom: "1rem" }}
        interval={false}
      >
        {/* first carousel image */}
        <CCarouselItem>
          {/* displays animal image based on fetched data */}
          <CImage
            className="d-block w-100 animal_result_image"
            src={animal.length > 0 ? animal[0].image : ""}
            alt="slide 1"
          />
          {/* caption for first image */}
          <CCarouselCaption
            className="d-md-block banner_label"
            style={{ width: "19rem" }}
          >
            {/* displays animal name based on fetched data */}
            <div>
              <span>{animal.length > 0 ? animal[0].name : ""}</span>
            </div>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
      <div className="result_page_container">
        <div className="animal_result">
          {/* displays animal class based on fetched data */}
          <div className="results_text" style={{ marginTop: "1rem" }}>
            <img src={classIcon} className="featured_icon" />
            {"Class: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>{animal[0].class}</span>
            ) : (
              ""
            )}
          </div>
          {/* displays animal conservation status and icon based on fetched data */}
          <div className="results_text">
            <img src={conservationIcon} className="featured_icon" />
            {"Conservation Status: "}
            {animal.length > 0 ? (
              <>
                <span style={{ color: "#d9d9d9" }}>{conservationStatus}</span>
              </>
            ) : (
              ""
            )}
          </div>
          {/* displays animal population based on fetched data */}
          <div className="results_text">
            <img src={populationIcon} className="featured_icon" />
            {"Wild Mature Population: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>{animal[0].population}</span>
            ) : (
              ""
            )}
          </div>
          {/* displays animal region based on fetched data */}
          {/* adds a separator underline below to demarcate different sections of text */}
          <div
            className="results_text"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "1rem",
            }}
          >
            <img src={regionIcon} className="featured_icon" />
            {"Regions: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>{animal[0].region}</span>
            ) : (
              ""
            )}
          </div>
          {/* displays animal habitats based on fetched data */}
          <div
            className="results_text"
            style={{ fontSize: "15px", marginTop: "1rem" }}
          >
            <img src={habitatIcon} className="featured_icon" />
            {"Habitats: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>
                {habitats.join(", ").toString()}
              </span>
            ) : (
              ""
            )}
          </div>
          {/* displays animal threats faced based on fetched data */}
          <div className="results_text" style={{ fontSize: "15px" }}>
            <img src={threatsIcon} className="featured_icon" />
            {"Threats: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>
                {threats.join(", ").toString()}
              </span>
            ) : (
              ""
            )}
            <br />
            {/* button to add ot remove animal from user spotlight */}
            <button className="add_spotlight_button" onClick={setSpotlight}>
              ADD/REMOVE FROM SPOTLIGHT
            </button>
            {addedSpotlight ? (
              <span
                style={{
                  marginLeft: "1rem",
                  textDecoration: "underline",
                  textDecorationColor: "#d9d9d9",
                  textUnderlineOffset: "5px",
                }}
              >
                Animal added to spotlight!
              </span>
            ) : (
              ""
            )}
            {removedSpotlight ? (
              <span
                style={{
                  marginLeft: "1rem",
                  textDecoration: "underline",
                  textDecorationColor: "#d9d9d9",
                  textUnderlineOffset: "5px",
                }}
              >
                Animal removed from spotlight!
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="back_button_container">
            <button className="back_button" onClick={() => navigate(-1)}>
              Return to previous page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAnimalResults;
