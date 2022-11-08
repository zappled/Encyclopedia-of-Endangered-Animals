import React, { useState } from "react";
import Navbar from "../common/Navbar";

const SearchAnimals = () => {
  const currentPage = "Search for Animals";
  const [activeButton, setActiveButton] = useState<string>("");
  const [conservationDisplay, setConservationDisplay] =
    useState<boolean>(false);
  const [habitatDisplay, setHabitatDisplay] = useState<boolean>(false);
  const [threatsDisplay, setThreatsDisplay] = useState<boolean>(false);

  const setValue = (e: string) => {
    setActiveButton("");
    setConservationDisplay(false);
    if (e == "conservation") {
      setActiveButton("conservation");
      setConservationDisplay(true);
    } else if (e == "habitat") {
      setActiveButton("habitat");
    } else if (e == "threats") {
      setActiveButton("threats");
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="search_page_container">
        <div className="search_button_container">
          <button
            className={
              activeButton == "conservation"
                ? "search_active_button"
                : "search_header_button"
            }
            onClick={() => setValue("conservation")}
          >
            Conservation Status
          </button>
          <button
            className={
              activeButton == "habitat"
                ? "search_active_button"
                : "search_header_button"
            }
            onClick={() => setValue("habitat")}
          >
            Habitat
          </button>
          <button
            className={
              activeButton == "threats"
                ? "search_active_button"
                : "search_header_button"
            }
            onClick={() => setValue("threats")}
          >
            Threats
          </button>

          <button
            className={"search_header_button"}
            style={{ display: conservationDisplay ? "inline" : "none" }}
            // onClick={() => setValue("DD")}
          >
            <p>Vulnerable</p>
            <p>Endangered</p>
            <p>Critically Endangered</p>
          </button>
          <button
            className={"search_header_button"}
            style={{ display: habitatDisplay ? "inline" : "none" }}
            // onClick={() => setValue("LC")}
          >
            Habitat
          </button>
          <button
            className={"search_header_button"}
            style={{ display: threatsDisplay ? "inline" : "none" }}
            // onClick={() => setValue("NT")}
          >
            Threats
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchAnimals;
