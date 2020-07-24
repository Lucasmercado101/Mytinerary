import React from "react";
import styles from "../Styles/city.module.css";
import MyLink from "./MyLink";

function City({ url, city, country }) {
  return (
    <div className={styles.city}>
      <img src={url} className={styles.city__image} />
      <MyLink to={`/cities/${city}`} className={styles.link}>
        <p className={styles.link__city}>{city}</p>
        <small className={styles.link__country}>{country}</small>
      </MyLink>
    </div>
  );
}

export default City;
