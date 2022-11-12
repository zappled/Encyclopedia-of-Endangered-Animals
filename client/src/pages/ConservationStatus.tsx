import React, { useState, useContext, useEffect } from "react";
import Navbar from "../common/Navbar";
import dataDeficientIcon from "../images/icons/conservation/data_deficient.png";
import leastConcernIcon from "../images/icons/conservation/least_concern.png";
import nearThreatenedIcon from "../images/icons/conservation/near_threatened.png";
import vulnerableIcon from "../images/icons/conservation/vulnerable.png";
import endangeredIcon from "../images/icons/conservation/endangered.png";
import criticallyEndangeredIcon from "../images/icons/conservation/critically_endangered.png";
import extinctWildIcon from "../images/icons/conservation/extinct_in_wild.png";
import extinctIcon from "../images/icons/conservation/extinct.png";
import Context from "../context/context";
import { useNavigate } from "react-router-dom";

const ConservationStatus = () => {
  const currentPage = "Conservation Status";

  const context = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    context.isLoggedIn ? <></> : navigate("/");
  }, []);

  const defaultText = (
    <>
      <div
        className="conservation_page_title"
        style={{ width: "50%", marginTop: "3.5rem" }}
      >
        Click the labels above to learn more about the various conservation
        statuses categorized by IUCN (International Union for Conservation of
        Nature)
      </div>
    </>
  );

  const [detailsText, setDetailsText] = useState(defaultText);
  const [activeButton, setActiveButton] = useState("");

  const DDText = (
    <>
      <img className="conservation_icon_enlarged" src={dataDeficientIcon} />
      <div className="conservation_page_content">
        <span>Data Deficient:</span>
        <br />
        Refers to species which have insufficient information for a proper
        assessment of conservation status.
        <br />
        Extinction risk: N/A
      </div>
    </>
  );

  const LCText = (
    <>
      <img className="conservation_icon_enlarged" src={leastConcernIcon} />
      <div className="conservation_page_content">
        <span>Least Concern:</span>
        <br />
        Refers to species which are still plentiful in the wild, and therefore
        not a focus of current conservation efforts.
        <br />
        Extinction risk: Low
      </div>
    </>
  );

  const NTText = (
    <>
      <img className="conservation_icon_enlarged" src={nearThreatenedIcon} />
      <div className="conservation_page_content">
        <span>Near Threatened:</span>
        <br />
        Refers to species which are not at risk at the moment, but may become
        vulnerable in the near future due to reduction in numbers or range.
        <br />
        Extinction risk: Low
      </div>
    </>
  );

  const VUText = (
    <>
      <img className="conservation_icon_enlarged" src={vulnerableIcon} />
      <div className="conservation_page_content">
        <span>Vulnerable:</span>
        <br />
        Refers to species threatened with extinction, unless the circumstances
        that are threatening its survival and reproduction improve.
        <br />
        Extinction risk: Medium
      </div>
    </>
  );

  const ENText = (
    <>
      <img className="conservation_icon_enlarged" src={endangeredIcon} />
      <div className="conservation_page_content">
        <span>Endangered:</span>
        <br />
        Refers to species very likely to become extinct in the near future, and
        hence are often the target of extensive conservation efforts.
        <br />
        Extinction risk: High
      </div>
    </>
  );

  const CRText = (
    <>
      <img
        className="conservation_icon_enlarged"
        src={criticallyEndangeredIcon}
      />
      <div className="conservation_page_content">
        <span>Critically Endangered:</span>
        <br />
        Refers to species facing an extremely high risk of extinction in the
        wild, including some that may be extinct but are still pending
        confirmation surveys.
        <br />
        Extinction risk: Very High
      </div>
    </>
  );

  const EWText = (
    <>
      <img className="conservation_icon_enlarged" src={extinctWildIcon} />
      <div className="conservation_page_content">
        <span>Extinct in the Wild:</span>
        <br />
        Refers to species which, due to massive habitat loss, only exist in
        captivity or as a naturalized population outside its historic range.
        <br />
        Extinction risk: Ecologically Extinct
      </div>
    </>
  );

  const EXText = (
    <>
      <img className="conservation_icon_enlarged" src={extinctIcon} />
      <div className="conservation_page_content">
        <span>Extinct:</span>
        <br />
        Refers to species whose populations have fully died out, even in
        captivity. Usually defined retrospectively due to the need for extensive
        confirmation surveys.
        <br />
        Extinction risk: Fully Extinct
      </div>
    </>
  );

  const setValue = (e) => {
    setActiveButton("");
    if (e == "DD") {
      setDetailsText(DDText);
      setActiveButton("DD");
    } else if (e == "LC") {
      setDetailsText(LCText);
      setActiveButton("LC");
    } else if (e == "NT") {
      setDetailsText(NTText);
      setActiveButton("NT");
    } else if (e == "VU") {
      setDetailsText(VUText);
      setActiveButton("VU");
    } else if (e == "EN") {
      setDetailsText(ENText);
      setActiveButton("EN");
    } else if (e == "CR") {
      setDetailsText(CRText);
      setActiveButton("CR");
    } else if (e == "EW") {
      setDetailsText(EWText);
      setActiveButton("EW");
    } else if (e == "EX") {
      setDetailsText(EXText);
      setActiveButton("EX");
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="banner conservation_banner"></div>
      <div className="conservation_page_container">
        <div className="conservation_icon_container">
          <img className="conservation_icon" src={dataDeficientIcon} alt="" />
          <img className="conservation_icon" src={leastConcernIcon} alt="" />
          <img className="conservation_icon" src={nearThreatenedIcon} alt="" />
          <img className="conservation_icon" src={vulnerableIcon} alt="" />
          <img className="conservation_icon" src={endangeredIcon} alt="" />
          <img
            className="conservation_icon"
            src={criticallyEndangeredIcon}
            alt=""
          />
          <img className="conservation_icon" src={extinctWildIcon} alt="" />
          <img className="conservation_icon" src={extinctIcon} alt="" />
        </div>
        <div className="conservation_button_container">
          <button
            className={
              activeButton == "DD" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("DD")}
          >
            Data Deficient
          </button>
          <button
            className={
              activeButton == "LC" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("LC")}
          >
            Least Concern
          </button>
          <button
            className={
              activeButton == "NT" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("NT")}
          >
            Near Threatened
          </button>
          <button
            className={
              activeButton == "VU" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("VU")}
          >
            Vulnerable
          </button>
          <button
            className={
              activeButton == "EN" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("EN")}
          >
            Endangered
          </button>
          <button
            className={
              activeButton == "CR" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("CR")}
          >
            Critically Endangered
          </button>
          <button
            className={
              activeButton == "EW" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("EW")}
          >
            Extinct in the Wild
          </button>
          <button
            className={
              activeButton == "EX" ? "active_button" : "conservation_button"
            }
            onClick={() => setValue("EX")}
          >
            Extinct
          </button>
        </div>
        <div className="conservation_details_container">{detailsText}</div>
      </div>
    </>
  );
};

export default ConservationStatus;
