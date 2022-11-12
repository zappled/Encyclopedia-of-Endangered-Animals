import React, { useState, useEffect, useContext} from "react";
import Navbar from "../common/Navbar";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const SearchAnimals = () => {
  const currentPage: string = "Search for Animals";
  const [conservationDisplay, setConservationDisplay] =
    useState<boolean>(false);
  const [habitatDisplay, setHabitatDisplay] = useState<boolean>(false);
  const [threatsDisplay, setThreatsDisplay] = useState<boolean>(false);

  const [animals, setAnimals] = useState([]);
  const [unfilteredAnimals, setUnfilteredAnimals] = useState([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

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
    const filtered = unfilteredAnimals.filter(
      (animal) => animal.conservation_status === e.toUpperCase()
    );
    setAnimals(filtered);
    setCurrentFilter(`habitat: "${e}"`);
  };

  const filterbyHabitat = (e: string) => {
    setIsFiltered(true);
    const filtered = unfilteredAnimals.filter((animal) =>
      animal.habitats.includes(e)
    );
    setAnimals(filtered);
    setCurrentFilter(`habitat: "${e}"`);
  };

  const filterbyThreats = (e: string) => {
    setIsFiltered(true);
    const filtered = unfilteredAnimals.filter((animal) =>
      animal.threats.includes(e)
    );
    setAnimals(filtered);
    setCurrentFilter(`threats: "${e}"`);
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
            <p onClick={() => filterbyStatus("Vulnerable")}>Vulnerable</p>
            <p onClick={() => filterbyStatus("Endangered")}>Endangered</p>
            <p onClick={() => filterbyStatus("Critically Endangered")}>
              Critically Endangered
            </p>
          </button>
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
            <p onClick={() => filterbyHabitat("Forest")}>Forest</p>
            <p onClick={() => filterbyHabitat("Savanna")}>Savanna</p>
            <p onClick={() => filterbyHabitat("Shrubland")}>Shrubland</p>
            <p onClick={() => filterbyHabitat("Grassland")}>Grassland</p>
            <p onClick={() => filterbyHabitat("Wetlands")}>Wetlands</p>
            <p onClick={() => filterbyHabitat("Rocky Areas")}>Rocky Areas</p>
            <p onClick={() => filterbyHabitat("Cave/Subterranean")}>
              Caves/Subterranean
            </p>
            <p onClick={() => filterbyHabitat("Desert")}>Desert</p>
            <p onClick={() => filterbyHabitat("Marine")}>Marine</p>
          </button>
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
            <p onClick={() => filterbyThreats("Human Intrusion")}>
              Human Intrusion
            </p>
            <p onClick={() => filterbyThreats("Biological Resource Use")}>
              Biological Resource Use
            </p>
            <p onClick={() => filterbyThreats("Invasive Species and Diseases")}>
              Invasive Species & Diseases
            </p>
            <p onClick={() => filterbyThreats("Pollution")}>Pollution</p>
            <p onClick={() => filterbyThreats("Climate Change")}>
              Climate Change
            </p>
            <p onClick={() => filterbyThreats("Geological Events")}>
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
                <>
                  <Link
                    to={`/search/animals/${entry.id}`}
                    style={{ textDecoration: "none" }}
                  >
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
                  </Link>
                  {/* <SearchAnimalResults /> */}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAnimals;
