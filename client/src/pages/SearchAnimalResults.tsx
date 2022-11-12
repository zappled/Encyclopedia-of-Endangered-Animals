import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CCarouselCaption } from "@coreui/react";
import { CImage } from "@coreui/react";

const SearchAnimalResults = () => {
  const animalId = window.location.href.slice(37);
  const [error, setError] = useState(null);
  const [animal, setAnimal] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [habitats, setHabitats] = useState({});
  const [threats, setThreats] = useState({});

  const fetchAnimalById = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/search/animals/${animalId}`
      );
      const data = await res.json();
      setAnimal(data);
      setCurrentPage(data[0].name);
      const habitatSet = new Set();
      for (const habitat of data[0].habitats) {
        habitatSet.add(habitat);
      }
      const threatsSet = new Set();
      for (const threat of data[0].threats) {
        threatsSet.add(threat);
      }
      setHabitats(habitatSet);
      setThreats(threatsSet);
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
      {/* <img
        className="animal_result_image"
        src={animal.length > 0 ? animal[0].image : ""}
      ></img> */}
      <div className="search_page_container">
        <div className="animal_result">
          <div className="results_text">
            {"Class: "}
            {animal.length > 0 ? animal[0].class : ""}
          </div>
          <div className="results_text">
            {"Conservation Status: "}
            {animal.length > 0 ? animal[0].conservation_status : ""}
          </div>
          <div className="results_text">
            {"Wild Population: "}
            {animal.length > 0 ? animal[0].population : ""}
          </div>
          {/* <div className="results_text">
            {"Habitats: "}
            {animal.length > 0 ? new Set(animal[0].habitats) : ""}
          </div> */}
          <div className="results_text">
            {"Threats: "}
            {animal.length > 0 ? new Set(animal[0].threats) : ""}
          </div>
          {/* <div>{{ habitats }}</div> */}
        </div>
      </div>
    </>
  );
};

export default SearchAnimalResults;
