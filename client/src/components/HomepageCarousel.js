import React from "react";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { CCarouselCaption } from "@coreui/react";
import { CImage } from "@coreui/react";
import bannerOne from "../images/homepage/homepagebanner_one.jpeg";
import bannerTwo from "../images/homepage/homepagebanner_two.jpeg";
import bannerThree from "../images/homepage/homepagebanner_three.jpeg";

const HomepageCarousel = () => {
  return (
    <>
      <CCarousel className="banner_container" transition="crossfade">
        {/* first carousel image */}
        <CCarouselItem>
          <CImage
            className="d-block w-100 banner"
            src={bannerOne}
            alt="slide 1"
          />
          {/* caption for first image with orange background */}
          <CCarouselCaption className="d-md-block banner_label">
            <div>
              Welcome to the <br />
              <span>
                Encyclopedia of <span className="orange">Endangered</span>{" "}
                Animals
              </span>
            </div>
          </CCarouselCaption>
        </CCarouselItem>
        {/* second carousel image */}
        <CCarouselItem>
          <CImage
            className="d-block w-100 banner"
            src={bannerTwo}
            alt="slide 2"
          />
          {/* caption for second image */}
          <CCarouselCaption className="d-md-block banner_label">
            <div>
              Welcome to the <br />
              <span>
                Encyclopedia of <span className="orange">Endangered</span>{" "}
                Animals
              </span>
            </div>
          </CCarouselCaption>
        </CCarouselItem>
        {/* third carousel image */}
        <CCarouselItem>
          <CImage
            className="d-block w-100 banner"
            src={bannerThree}
            alt="slide 3"
          />
          {/* caption for third image */}
          <CCarouselCaption className="d-md-block banner_label">
            <div>
              Welcome to the <br />
              <span>
                Encyclopedia of <span className="orange">Endangered</span>{" "}
                Animals
              </span>
            </div>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </>
  );
};

export default HomepageCarousel;
