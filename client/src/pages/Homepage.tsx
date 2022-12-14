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
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets current page name on navbar
  const currentPage: string = "Homepage";

  // sets featured animal data based on result of fetch random animal function
  const [featuredAnimal, setFeaturedAnimal] = useState<any>({});

  // sets the correct conservation status & icon for the fetched featured animal
  const [conservationStatus, setConservationStatus] = useState<string>("");
  const [conservationIcon, setConservationIcon] = useState<string>("");

  // fetches data of a random animal in the database on initial mount
  const fetchRandomAnimal = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setFeaturedAnimal(data[randomIndex]);
      const dataStatus = data[randomIndex].conservation_status;
      // sets conservation status & icon state here
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

  // fetches random animal data on initial mount

  useEffect(() => {
    context.isLoggedIn ? fetchRandomAnimal() : navigate("/");
  }, []);

  return (
    <>
      <Navbar currentPage={currentPage} />
      <HomepageCarousel />
      <div className="page_container">
        {/* container for featured animal  */}
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
            <Link
              to={`/search/animals/${featuredAnimal.id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="main_button">LEARN MORE</button>
            </Link>
          </div>
          <img
            className="featured_image"
            src={featuredAnimal ? featuredAnimal.image : ""}
          />
        </div>

        {/* container linking to 'conservation status' page */}
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

        {/* container linking to 'search animal database' page */}
        <Link to="/search/animals" style={{ textDecoration: "none" }}>
          <div className="feature_box">
            <div className="featured_details">
              <div className="search_database_title">
                Search Our Animal Database
              </div>
            </div>
            <div className="search_image"></div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Homepage;
