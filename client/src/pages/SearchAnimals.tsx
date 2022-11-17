import React, { useState, useEffect, useContext } from "react";
import Navbar from "../common/Navbar";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

const SearchAnimals = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets current page name on navbar
  const currentPage: string = "Search for Animals";

  // toggle to open/close expanded body with search filter options
  const [conservationDisplay, setConservationDisplay] =
    useState<boolean>(false);
  const [habitatDisplay, setHabitatDisplay] = useState<boolean>(false);
  const [threatsDisplay, setThreatsDisplay] = useState<boolean>(false);

  // sets animal array based on fetched data
  // animals state is used to filter search options
  // unfilteredAnimals state is used to reset back to unfiltered array after filtering
  const [animals, setAnimals] = useState([]);
  const [unfilteredAnimals, setUnfilteredAnimals] = useState([]);

  // when toggled, displays text indicating the current active filter
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  // changes text being displayed for each set of filters in use
  const [currentFilter, setCurrentFilter] = useState<string>("");

  // on click, stores the current filter value for habitat, threat & conservation status
  const [habitatFilter, setHabitatFilter] = useState<string>("");
  const [threatFilter, setThreatFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // auto-navigates user back to login page if not logged in
  // if logged in, fetches data from animal database
  useEffect(() => {
    context.isLoggedIn ? fetchAnimals() : navigate("/");
  }, []);

  // shuffle function used after fetching animals
  // randomizes display order of the animals on each page load
  const shuffle = (array: []) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // fetches all animal data on initial mount
  const fetchAnimals = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/animals");
      const data = await response.json();
      // shuffles order after fetch
      shuffle(data);
      setAnimals(data);
      setUnfilteredAnimals(data);
    } catch (err) {
      console.log(err);
    }
  };

  // filters by name using the previous filtered section
  // returns results that includes the input text
  const filterbyName = (input) => {
    setIsFiltered(true);
    const previousFilteredSelection = [...animals];
    console.log(previousFilteredSelection);
    const filtered = animals.filter((animal) =>
      animal.name.toLowerCase().includes(input)
    );
    setAnimals(filtered);
    setCurrentFilter(`name: "${input}"`);
    if (!input) {
      // once input is cleared, resets all filters back to original state
      resetFilters();
      setIsFiltered(false);
    }
  };

  // sets the status filter state based on selected button value
  const filterbyStatus = (e: string) => {
    setIsFiltered(true);
    setStatusFilter(e);
  };

  // sets the habitat filter state based on selected button value
  const filterbyHabitat = (e: string) => {
    setIsFiltered(true);
    setHabitatFilter(e);
  };

  // sets the threat filter state based on selected button value
  const filterbyThreats = (e: string) => {
    setIsFiltered(true);
    setThreatFilter(e);
  };

  // filters data based on status, habitat & threat filter states
  const filterByMultiple = () => {
    // if all three filters have been selected, filters results by all 3 parameters
    if (threatFilter && habitatFilter && statusFilter) {
      const filtered = unfilteredAnimals.filter(
        (animal) =>
          animal.threats.includes(threatFilter) &&
          animal.habitats.includes(habitatFilter) &&
          animal.conservation_status === statusFilter.toUpperCase()
      );
      setAnimals(filtered);
      setCurrentFilter(
        `status '${statusFilter}', habitat '${habitatFilter}' & threat '${threatFilter}'`
      );
      // filters by only threat and filter filter
    } else if (threatFilter && habitatFilter && !statusFilter) {
      const filtered = unfilteredAnimals.filter(
        (animal) =>
          animal.threats.includes(threatFilter) &&
          animal.habitats.includes(habitatFilter)
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat '${habitatFilter}' & threat '${threatFilter}'`);
      // filters by only habitat and status filter
    } else if (!threatFilter && habitatFilter && statusFilter) {
      const filtered = unfilteredAnimals.filter(
        (animal) =>
          animal.habitats.includes(habitatFilter) &&
          animal.conservation_status === statusFilter.toUpperCase()
      );
      setAnimals(filtered);
      setCurrentFilter(`status '${statusFilter}' & habitat '${habitatFilter}'`);
      // filters by only threat and status filter
    } else if (threatFilter && !habitatFilter && statusFilter) {
      const filtered = unfilteredAnimals.filter(
        (animal) =>
          animal.threats.includes(threatFilter) &&
          animal.conservation_status === statusFilter.toUpperCase()
      );
      setAnimals(filtered);
      setCurrentFilter(`status '${statusFilter}' & habitat '${habitatFilter}'`);
      // filters by only status filter
    } else if (!threatFilter && !habitatFilter && statusFilter) {
      const filtered = unfilteredAnimals.filter(
        (animal) => animal.conservation_status === statusFilter.toUpperCase()
      );
      setAnimals(filtered);
      setCurrentFilter(`status '${statusFilter}'`);
      // filters by only habitat filter
    } else if (!threatFilter && habitatFilter && !statusFilter) {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.habitats.includes(habitatFilter)
      );
      setAnimals(filtered);
      setCurrentFilter(`habitat '${habitatFilter}'`);
      // filters by only threat filter
    } else if (threatFilter && !habitatFilter && !statusFilter) {
      const filtered = unfilteredAnimals.filter((animal) =>
        animal.threats.includes(threatFilter)
      );
      setAnimals(filtered);
      setCurrentFilter(`threat '${threatFilter}'`);
    }
  };

  // resets all filters and displayed data back to default
  const resetFilters = () => {
    setAnimals(unfilteredAnimals);
    setHabitatFilter("");
    setThreatFilter("");
    setStatusFilter("");
    setIsFiltered(false);
  };

  // runs the filter function whenever any of the 3 filter states is updated
  useEffect(() => {
    filterByMultiple();
  }, [habitatFilter, threatFilter, statusFilter]);

  // opens or closes conservation status dropdown
  const openConservationDropdown = () => {
    setConservationDisplay(!conservationDisplay);
  };

  // opens or closes habitat dropdown
  const openHabitatDropdown = () => {
    setHabitatDisplay(!habitatDisplay);
  };

  // opens or closes threats dropdown
  const openThreatsDropdown = () => {
    setThreatsDisplay(!threatsDisplay);
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="search_page_container">
        <div className="three_buttons_container">
          {/* input form to allow users to filter animals by name */}
          <div className="animal_search_label">Search by Animal Name:</div>
          <input
            type="text"
            className="animal_search_input"
            onChange={(e) => filterbyName(e.target.value)}
          />

          {/* button to toggle additional conservation dropdown */}
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
          {/* dropdown contains buttons to filter search by different conversation statuses */}
          <div
            className={"search_header_content"}
            style={{ display: conservationDisplay ? "block" : "none" }}
          >
            <p style={{ fontSize: "1rem", color: "#0b1f04" }}>
              Filter by animal's extinction risk:
            </p>
            <p onClick={() => filterbyStatus("Vulnerable")}>Vulnerable</p>
            <p onClick={() => filterbyStatus("Endangered")}>Endangered</p>
            <p onClick={() => filterbyStatus("Critically Endangered")}>
              Critically Endangered
            </p>
          </div>
          {/* button to toggle additional habitat dropdown */}
          <button
            className={
              habitatDisplay ? "search_active_button" : "search_header_button"
            }
            onClick={openHabitatDropdown}
          >
            Habitat
          </button>
          {/* dropdown contains buttons to filter search by different habitats */}
          <div
            className={"search_header_content"}
            style={{ display: habitatDisplay ? "block" : "none" }}
          >
            <p style={{ fontSize: "1rem", color: "#0b1f04" }}>
              Filter by animal's living environment:
            </p>
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
          </div>
          {/* button to toggle additional threats dropdown */}
          <button
            className={
              threatsDisplay ? "search_active_button" : "search_header_button"
            }
            onClick={openThreatsDropdown}
          >
            Threats
          </button>
          {/* dropdown contains buttons to filter search by different threats faced */}
          <div
            className={"search_header_content"}
            style={{ display: threatsDisplay ? "block" : "none" }}
          >
            <p style={{ fontSize: "1rem", color: "#0b1f04" }}>
              Filter by animal's threats to survival:
            </p>
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
          </div>
          {/* button to reset all search filters and display full unfiltered animal data again */}
          <button
            className={"search_header_button"}
            style={{ color: "#d9d9d9" }}
            onClick={resetFilters}
          >
            Reset Search Filters
          </button>
        </div>
        {/* displays the parameters currently used to filter the results */}
        {/* only displays if at least 1 filter is in use */}
        <div className="search_results_container">
          <div className="filter_indicator">
            <span
              style={{
                display: isFiltered ? "block" : "none",
                fontSize: "11px",
              }}
            >
              Filtering by {currentFilter}
            </span>
          </div>
          {/* maps animal image, name & conservation status into their individual entry box */}
          {/* displays a different conservation icon based on their status */}
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
