import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCity } from "../Redux/Actions/postCity";
import { postItineraries } from "../Redux/Actions/postCreateCityItineraries";
import styles from "../Styles/newCityTemplate.module.css";

function NewCityTemplate() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const createNewCity = (e) => {
    e.preventDefault();
    if (city && country) {
      const newCity = {
        city,
        country,
        url: `https://source.unsplash.com/1600x900/?${city}?aerial`,
      };
      dispatch(postCity(newCity));
      dispatch(postItineraries({ city }));
      setCity("");
      setCountry("");
    }
  };

  return (
    <form onSubmit={(e) => createNewCity(e)}>
      <div className={styles.newCity}>
        <input
          className={styles.newCity__city}
          type="text"
          name="city"
          placeholder="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <small>
          <input
            className={styles.newCity__country}
            type="text"
            name="country"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </small>
      </div>
      <input className={styles.submit} type="submit" value="Create" />
    </form>
  );
}

export default NewCityTemplate;
