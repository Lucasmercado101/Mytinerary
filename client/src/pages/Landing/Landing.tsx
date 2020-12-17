import React, { useEffect } from "react";
import mytineraryLogo from "../../Images/mytinerary_logo.svg";
import circleright from "../../Images/arrowRight.svg";
import MyLink from "../../Components/MyLink";
import useStyles from "./Styles";
import heroImg from "../../Images/heroBgr.jpg";
import Carousel from "./Carousel";

const Landing: React.FC = () => {
  const { hero, logoImg, title, browseArrow } = useStyles({
    imageUrl: heroImg
  });

  useEffect(() => {
    document.title = "Mytinerary";
  }, []);

  return (
    <>
      <header className={hero}>
        <img className={logoImg} alt={"Mytinerary log"} src={mytineraryLogo} />
        <h1 className={title}>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </h1>
        <MyLink to="/cities">
          <img
            className={browseArrow}
            alt={"White right arrow"}
            src={circleright}
          />
        </MyLink>
      </header>
      <Carousel />
    </>
  );
};

export default Landing;
