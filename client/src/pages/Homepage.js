import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import HomepageCarousel from "../components/HomepageCarousel";
import animals from "../mockData";

const Homepage = () => {
  const [animalIndex, setAnimalIndex] = useState(0);
  const [conservationStatus, setConservationStatus] = useState("");

  useEffect(() => {
    setAnimalIndex(Math.floor(Math.random() * animals.length));
    getStatus();
  }, []);

  const getStatus = () => {
    if (animals[animalIndex].conservation_status === "CR") {
      setConservationStatus("Critically Endangered");
    }
  };

  return (
    <>
      <Navbar />
      <HomepageCarousel />
      <div className="homepage_container">
        <div className="feature_box">
          <div className="featured_details">
            <div className="featured_label">
              <span class="material-symbols-outlined">star</span>Featured
              Animal:
            </div>
            <div className="featured_name">{animals[animalIndex].name}</div>
            <div className="featured_info">{conservationStatus}</div>
            <div>{animals[animalIndex].habitat}</div>
          </div>
          <img className="featured_image" src={animals[animalIndex].image} />
        </div>
        <div className="conservation_box"></div>
        <div className="search_box"></div>
      </div>
    </>
  );
};

export default Homepage;
