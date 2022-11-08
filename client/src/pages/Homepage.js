import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import HomepageCarousel from "../components/HomepageCarousel";
import animals from "../mockData";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import regionIcon from "../images/icons/data/icons8-globe_lightgrey.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [animalIndex, setAnimalIndex] = useState(0);
  const currentPage = "Homepage";

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
      <Navbar currentPage={currentPage} />
      <HomepageCarousel />
      <div className="page_container">
        <div className="feature_box">
          <div className="featured_details">
            <div className="featured_label">
              <span className="material-symbols-outlined">star</span>Featured
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

        <Link to="/conservation_status" style={{ textDecoration: "none" }}>
          <div className="feature_box">
            <div className="featured_details">
              <div className="conservation_title">
                Conservation Statuses Explained
              </div>
            </div>
            <div className="conservation_image"></div>
          </div>
        </Link>

        <div className="feature_box">
          <div className="featured_details">
            <div className="search_database_title">
              Search Our Animal Database
            </div>
          </div>
          <div className="search_image"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
