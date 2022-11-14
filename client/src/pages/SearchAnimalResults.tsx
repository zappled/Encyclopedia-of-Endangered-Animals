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

const SearchAnimalResults = () => {
  const animalId = window.location.href.slice(37);
  const [error, setError] = useState(null);
  const [animal, setAnimal] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  const context = useContext(Context);
  const navigate = useNavigate();

  const [conservationStatus, setConservationStatus] = useState("");
  const [conservationIcon, setConservationIcon] = useState("");
  const [habitats, setHabitats] = useState([]);
  const [threats, setThreats] = useState([]);

  const [removedSpotlight, setRemovedSpotlight] = useState(false);
  const [addedSpotlight, setAddedSpotlight] = useState(false);

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

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
      if (data[0].habitats.includes("Forest")) {
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
          <CImage
            className="d-block w-100 animal_result_image"
            src={animal.length > 0 ? animal[0].image : ""}
            alt="slide 1"
          />
          {/* caption for first image with orange background */}
          <CCarouselCaption
            className="d-md-block banner_label"
            style={{ width: "19rem" }}
          >
            <div>
              <span>{animal.length > 0 ? animal[0].name : ""}</span>
            </div>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
      <div className="result_page_container">
        <div className="animal_result">
          <div className="results_text" style={{ marginTop: "1rem" }}>
            {"Class: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>{animal[0].class}</span>
            ) : (
              ""
            )}
          </div>
          <div className="results_text">
            {"Conservation Status: "}
            {animal.length > 0 ? (
              <>
                <img
                  src={conservationIcon}
                  className="featured_icon"
                  style={{ margin: "0 0.2rem" }}
                />
                <span style={{ color: "#d9d9d9" }}>{conservationStatus}</span>
              </>
            ) : (
              ""
            )}
          </div>
          <div
            className="results_text"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "1rem",
            }}
          >
            {"Wild Population: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>{animal[0].population}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className="results_text"
            style={{ fontSize: "15px", marginTop: "1rem" }}
          >
            {"Habitats: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>
                {habitats.join(", ").toString()}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="results_text" style={{ fontSize: "15px" }}>
            {"Threats: "}
            {animal.length > 0 ? (
              <span style={{ color: "#d9d9d9" }}>
                {threats.join(", ").toString()}
              </span>
            ) : (
              ""
            )}
            <br />
            <button className="add_spotlight_button" onClick={setSpotlight}>
              Add/Remove From Spotlight
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
        </div>
      </div>
    </>
  );
};

export default SearchAnimalResults;
