import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import HomepageCarousel from "../components/HomepageCarousel";
import animals from "../mockData";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import regionIcon from "../images/icons/data/icons8-globe_lightgrey.png";

const Homepage = () => {
  const [animalIndex, setAnimalIndex] = useState(0);
  // const [conservationStatus, setConservationStatus] = useState("");

  useEffect(() => {
    setAnimalIndex(Math.floor(Math.random() * animals.length));
  }, []);

  let conservation_status = "test";
  let conservationIcon = "";

  const getStatus = () => {
    const dataStatus = animals[animalIndex].conservation_status;
    if (dataStatus === "CR") {
      conservation_status = "Critically Endangered";
      conservationIcon = criticallyEndangeredIcon;
    } else if (dataStatus === "EN") {
      conservation_status = "Endangered";
      conservationIcon = endangeredIcon;
    }
  };

  getStatus();

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
            <div className="featured_info">
              <img src={conservationIcon} className="featured_icon" />
              {conservation_status}
            </div>
            <div className="featured_info">
              <img src={regionIcon} className="featured_icon" />
              {animals[animalIndex].region.join(", ")}
            </div>
            <button className="main_button">LEARN MORE</button>
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
