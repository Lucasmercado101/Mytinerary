import React, { useEffect } from "react";
import mytineraryLogo from "../Images/mytinerary_logo.svg";
import circleright from "../Images/arrowRight.svg";
import { Link } from "react-router-dom";
// import MyLink from "../MyLink";
// import carousel1img from "../../Images/carousel1.jpg";
// import carousel2img from "../../Images/carousel2.jpg";
// import carousel3img from "../../Images/carousel3.jpg";
// import carousel4img from "../../Images/carousel4.jpg";
// import carousel5img from "../../Images/carousel5.jpg";
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";

// const images = [
//   carousel1img,
//   carousel2img,
//   carousel3img,
//   carousel4img,
//   carousel5img,
// ];

function Landing() {
  useEffect(() => {
    document.title = "Mytinerary";
  }, []);

  return (
    <>
      <header>
        <img alt={"Mytinerary log"} src={mytineraryLogo} />
        <h1>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </h1>
        <Link to="/cities">
          <img alt={"White right arrow"} src={circleright} />
        </Link>
      </header>
      <section>
        <h2>Popular MYtineraries</h2>

        {/* <Slider style={{ backgroundColor: "red" }} autoplay={3000}>
          {images.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item}') no-repeat center center / cover`,
              }}
            ></div>
          ))}
        </Slider> */}
      </section>
    </>
  );
}

export default Landing;
