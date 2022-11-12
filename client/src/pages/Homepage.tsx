import React, { useState, useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import HomepageCarousel from "../components/HomepageCarousel";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import regionIcon from "../images/icons/data/icons8-globe_lightgrey.png";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/context";

const Homepage = () => {
  const currentPage: string = "Homepage";
  const context = useContext(Context);
  const navigate = useNavigate();
  const [initialMount, setInitialMount] = useState(true);
  const [featuredAnimal, setFeaturedAnimal] = useState<any>({});

  const [conservationStatus, setConservationStatus] = useState("");
  const [conservationIcon, setConservationIcon] = useState("");

  const fetchRandomAnimal = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setFeaturedAnimal(data[randomIndex]);
      const dataStatus = data[randomIndex].conservation_status;
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
    fetchRandomAnimal();
  }, []);

  // useEffect(() => {
  //   if (initialMount) {
  //     setInitialMount(false);
  //   } else {
  //     getStatus();
  //   }
  // }, [featuredAnimal]);

  // const getStatus = () => {
  //   console.log(featuredAnimal);
  //   const dataStatus = featuredAnimal[0].conservation_status;
  //   if (dataStatus === "CRITICALLY ENDANGERED") {
  //     conservation_status = "Critically Endangered";
  //     conservationIcon = criticallyEndangeredIcon;
  //   } else if (dataStatus === "ENDANGERED") {
  //     conservation_status = "Endangered";
  //     conservationIcon = endangeredIcon;
  //   } else if (dataStatus === "VULNERABLE") {
  //     conservation_status = "Vulnerable";
  //     conservationIcon = vulnerableIcon;
  //   }
  // };

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
            <div className="featured_name">
              {featuredAnimal ? featuredAnimal.name : ""}
            </div>
            <div className="featured_info">
              <img src={conservationIcon} className="featured_icon" />
              {conservationStatus}
            </div>
            <div className="featured_info">
              <img src={regionIcon} className="featured_icon" />
              {featuredAnimal ? featuredAnimal.region : ""}
            </div>
            <button className="main_button">LEARN MORE</button>
          </div>
          <img
            className="featured_image"
            src={featuredAnimal ? featuredAnimal.image : ""}
          />
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
