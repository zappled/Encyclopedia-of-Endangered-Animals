import React, { useState, useEffect, useRef } from "react";
import Navbar from "../common/Navbar";
import SearchAnimalResults from "../components/SearchAnimalResults";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import ConservationStatus from "./ConservationStatus";

const SearchAnimals = () => {
  const currentPage = "Search for Animals";
  const [activeButton, setActiveButton] = useState<string>("");
  const [conservationDisplay, setConservationDisplay] =
    useState<boolean>(false);
  const [habitatDisplay, setHabitatDisplay] = useState<boolean>(false);
  const [threatsDisplay, setThreatsDisplay] = useState<boolean>(false);

  const [animals, setAnimals] = useState([]);
  const [unfilteredAnimals, setUnfilteredAnimals] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("");

  function shuffle(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      shuffle(data);
      setAnimals(data);
      setUnfilteredAnimals(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterbyName = (input) => {
    setIsFiltered(true);
    const filtered = unfilteredAnimals.filter((animal) =>
      animal.name.toLowerCase().includes(input)
    );
    setAnimals(filtered);
    setCurrentFilter(`name: "${input}"`);
    if (!input) {
      setIsFiltered(false);
    }
  };

  const filterbyStatus = (e: string) => {
    setIsFiltered(true);
    if (e === "VU") {
      const filtered = unfilteredAnimals.filter(
        (animal) => animal.conservation_status === "VULNERABLE"
      );
      setAnimals(filtered);
      setCurrentFilter(`conservation status: "Vulnerable"`);
    } else if (e === "EN") {
      const filtered = unfilteredAnimals.filter(
        (animal) => animal.conservation_status === "ENDANGERED"
      );
      setAnimals(filtered);
      setCurrentFilter(`conservation status: "Endangered"`);
    } else if (e === "CR") {
      const filtered = unfilteredAnimals.filter(
        (animal) => animal.conservation_status === "CRITICALLY ENDANGERED"
      );
      setAnimals(filtered);
      setCurrentFilter(`conservation status: "Critically Endangered"`);
    }
  };

  const filterbyHabitat = (e: string) => {
    setIsFiltered(true);
    if (e === "FOREST") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Forest")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Forest"`);
    } else if (e === "SAVANNA") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Savanna")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Savanna"`);
    } else if (e === "SHRUBLAND") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Shrubland")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Shrubland"`);
    } else if (e === "GRASSLAND") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Grassland")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Grassland"`);
    } else if (e === "WETLANDS") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Wetlands")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Wetlands"`);
    } else if (e === "ROCKY") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Rocky")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Rocky Areas"`);
    } else if (e === "CAVE") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Cave")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Cave/Subterranean"`);
    } else if (e === "DESERT") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Desert")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Desert"`);
    } else if (e === "MARINE") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes("Marine")
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat: "Marine"`);
    }
  };

  const filterbyThreats = (e: string) => {
    setIsFiltered(true);
    if (e === "HUMAN") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Human Intrusion")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Human Intrusion"`);
    } else if (e === "RESOURCE") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Biological Resource Use")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Biological Resource Use"`);
    } else if (e === "INVASIVE") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Invasive Species and Diseases")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Invasive Species and Diseases"`);
    } else if (e === "POLLUTION") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Pollution")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Pollution"`);
    } else if (e === "CLIMATE") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Climate Change")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Climate Change"`);
    } else if (e === "GEOLOGICAL") {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes("Geological Events")
      );
      setAnimals(filtered);
      setCurrentFilter(`threats: "Geological Events"`);
    }
  };

  const resetFilters = () => {
    setAnimals(unfilteredAnimals);
    setIsFiltered(false);
  };

  // fetches data from animal database on initial mount
  useEffect(() => {
    fetchAnimals();
  }, []);

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
          <input
            type="text"
            className="animal_search_input"
            onChange={(e) => filterbyName(e.target.value)}
          />
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
            <p onClick={() => filterbyStatus("VU")}>Vulnerable</p>
            <p onClick={() => filterbyStatus("EN")}>Endangered</p>
            <p onClick={() => filterbyStatus("CR")}>Critically Endangered</p>
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
            <p onClick={() => filterbyHabitat("FOREST")}>Forest</p>
            <p onClick={() => filterbyHabitat("SAVANNA")}>Savanna</p>
            <p onClick={() => filterbyHabitat("SHRUBLAND")}>Shrubland</p>
            <p onClick={() => filterbyHabitat("GRASSLAND")}>Grassland</p>
            <p onClick={() => filterbyHabitat("WETLANDS")}>Wetlands</p>
            <p onClick={() => filterbyHabitat("ROCKY")}>Rocky Areas</p>
            <p onClick={() => filterbyHabitat("CAVE")}>Caves/Subterranean</p>
            <p onClick={() => filterbyHabitat("DESERT")}>Desert</p>
            <p onClick={() => filterbyHabitat("MARINE")}>Marine</p>
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
            <p onClick={() => filterbyThreats("HUMAN")}>Human Intrusion</p>
            <p onClick={() => filterbyThreats("RESOURCE")}>
              Biological Resource Use
            </p>
            <p onClick={() => filterbyThreats("INVASIVE")}>
              Invasive Species & Diseases
            </p>
            <p onClick={() => filterbyThreats("POLLUTION")}>Pollution</p>
            <p onClick={() => filterbyThreats("CLIMATE")}>Climate Change</p>
            <p onClick={() => filterbyThreats("GEOLOGICAL")}>
              Geological Events
            </p>
          </button>

          <button
            className={"search_header_button"}
            style={{ color: "#d9d9d9" }}
            onClick={resetFilters}
          >
            Reset Search Filters
          </button>
        </div>

        <div className="search_results_container">
          <div className="filter_indicator">
            <span style={{ display: isFiltered ? "block" : "none" }}>
              You are filtering by {currentFilter}
            </span>
          </div>
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
                      {entry.conservation_status === "ENDANGERED" ? (
                        <>
                          <img
                            src={endangeredIcon}
                            className="featured_icon"
                            alt="endangered"
                          />
                        </>
                      ) : entry.conservation_status === "VULNERABLE" ? (
                        <>
                          <img
                            src={vulnerableIcon}
                            className="featured_icon"
                            alt="vulnerable"
                          />
                        </>
                      ) : entry.conservation_status ===
                        "CRITICALLY ENDANGERED" ? (
                        <>
                          <img
                            src={criticallyEndangeredIcon}
                            className="featured_icon"
                            alt="critically endangered"
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
