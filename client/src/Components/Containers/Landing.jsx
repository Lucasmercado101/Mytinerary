import React, { useEffect } from "react";
import mytineraryLogo from "../../Images/mytinerary logo.svg";
import circleright from "../../Images/arrowRight.svg";
import styles from "../../Styles/landing.module.css";
import MyLink from "../MyLink";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import carousel1img from "../../Images/carousel1.jpg";
import carousel2img from "../../Images/carousel2.jpg";
import carousel3img from "../../Images/carousel3.jpg";
import carousel4img from "../../Images/carousel4.jpg";
import carousel5img from "../../Images/carousel5.jpg";

function Landing() {
  useEffect(() => {
    document.title = "Mytinerary";
  }, []);

  return (
    <>
      <header className={styles.hero}>
        <img className={styles.hero__logo} src={mytineraryLogo} />
        <h1 className={styles.hero__myTinerary}>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </h1>
        <MyLink to="/cities">
          <img className={styles.browse} src={circleright} />
        </MyLink>
      </header>
      <section className={styles.section}>
        <h2 className={styles.h2}>Popular MYtineraries</h2>
        <AwesomeSlider>
          <div data-src={carousel1img} />
          <div data-src={carousel2img} />
          <div data-src={carousel3img} />
          <div data-src={carousel4img} />
          <div data-src={carousel5img} />
        </AwesomeSlider>
      </section>
    </>
  );
}

export default Landing;
