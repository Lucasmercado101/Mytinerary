import React from "react";
import styles from "../Styles/city.module.css";
import MyLink from "./MyLink";

function City({ url, city, country }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
         url(${url})`,
      }}
      className={styles.city}
    >
      <MyLink to={`/cities/${city}`} className={styles.city__cityName}>
        {city}
        <small className={styles.city__country}>{country}</small>
      </MyLink>
    </div>
  );
}

export default City;
