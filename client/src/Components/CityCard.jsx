import React from "react";
import styles from "../Styles/cityCard.module.css";
import MyLink from "./MyLink";

function City({ style, url, city, country, link }) {
  return (
    <div style={style} className={styles.cityCard}>
      <img src={url} className={styles.cityCard__image} />
      {link ? (
        <MyLink to={`/cities/${city}`} className={styles.cityInfo}>
          <p className={styles.cityInfo__city}>{city}</p>
          <small className={styles.cityInfo__country}>{country}</small>
        </MyLink>
      ) : (
        <div className={styles.cityInfo}>
          <p className={styles.cityInfo__city}>{city}</p>
          <small className={styles.cityInfo__country}>{country}</small>
        </div>
      )}
    </div>
  );
}

export default City;
