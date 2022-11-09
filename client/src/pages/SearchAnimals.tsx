import React, { useState } from "react";
import Navbar from "../common/Navbar";
import SearchAnimalResults from "../components/SearchAnimalResults";
import animals from "../mockData";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";

const SearchAnimals = () => {
  const currentPage = "Search for Animals";
  const [activeButton, setActiveButton] = useState<string>("");
  const [conservationDisplay, setConservationDisplay] =
    useState<boolean>(false);
  const [habitatDisplay, setHabitatDisplay] = useState<boolean>(false);
  const [threatsDisplay, setThreatsDisplay] = useState<boolean>(false);

  let database = animals;

  const openConservationDropdown = () => {
    setConservationDisplay(!conservationDisplay);
  };

  const openHabitatDropdown = () => {
    setHabitatDisplay(!habitatDisplay);
  };

  const openThreatsDropdown = () => {
    setThreatsDisplay(!threatsDisplay);
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="search_page_container">
        <div className="three_buttons_container">
          <div className="animal_search_label">Search by Animal Name:</div>
          <input className="animal_search_input"></input>
          {/* <div className="search_button_container"> */}
          <button
            className={
              conservationDisplay
                ? "search_active_button"
                : "search_header_button"
            }
            onClick={openConservationDropdown}
          >
            Conservation Status
          </button>
          <button
            className={"search_header_content"}
            style={{ display: conservationDisplay ? "block" : "none" }}
          >
            <p>Vulnerable</p>
            <p>Endangered</p>
            <p>Critically Endangered</p>
          </button>
          {/* </div> */}
          {/* <div className="search_button_container"> */}
          <button
            className={
              habitatDisplay ? "search_active_button" : "search_header_button"
            }
            onClick={openHabitatDropdown}
          >
            Habitat
          </button>
          <button
            className={"search_header_content"}
            style={{ display: habitatDisplay ? "block" : "none" }}
          >
            <p>Forest</p>
            <p>Savanna</p>
            <p>Shrubland</p>
            <p>Grassland</p>
            <p>Wetlands</p>
            <p>Rocky Areas</p>
            <p>Caves/Subterranean</p>
            <p>Desert</p>
            <p>Marine</p>
          </button>
          {/* </div>
          <div className="search_button_container"> */}
          <button
            className={
              threatsDisplay ? "search_active_button" : "search_header_button"
            }
            onClick={openThreatsDropdown}
          >
            Threats
          </button>

          <button
            className={"search_header_content"}
            style={{ display: threatsDisplay ? "block" : "none" }}
          >
            <p>Human Intrusion</p>
            <p>Biological Resource Use</p>
            <p>Invasive Species & Diseases</p>
            <p>Pollution</p>
            <p>Climate Change</p>
            <p>Geological Events</p>
          </button>
          {/* </div> */}
        </div>
        <div className="search_results_container">
          {/* {animals.map(entry => ({
                id={entry.id}
                name={entry.name}
                conservation_status={entry.conservation_status}
                image={entry.image}
                habitat={entry.habitat}
                region={entry.region}
                population={entry.population}
                threats={entry.threats}

          } as SearchAnimalResults))} */}
          <div className="animal_entry_container">
            {animals.map((entry: any) => {
              return (
                <div className="animal_entry">
                  <div
                    className="animal_picture"
                    style={{
                      backgroundImage: `url(${entry.image}`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="animal_details">
                    <div className="animal_label">{entry.name}</div>
                    <div className="animal_status">
                      {entry.conservation_status == "EN" ? (
                        <>
                          <img src={endangeredIcon} className="featured_icon" />
                        </>
                      ) : entry.conservation_status == "VU" ? (
                        <>
                          <img src={vulnerableIcon} className="featured_icon" />
                        </>
                      ) : entry.conservation_status == "CR" ? (
                        <>
                          <img
                            src={criticallyEndangeredIcon}
                            className="featured_icon"
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAnimals;
