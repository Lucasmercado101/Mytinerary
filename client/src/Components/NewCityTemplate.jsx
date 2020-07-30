import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postingCity } from "../Redux/Actions/citiesActions";
import styles from "../Styles/newCityTemplate.module.css";

function NewCityTemplate() {
  const isPostingCity = useSelector((state) => state.cities.isPostingCity);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const createNewCity = async (e) => {
    e.preventDefault();
    setCity("");
    setCountry("");

    const newCity = {
      city,
      country,
      url: `https://source.unsplash.com/1600x900/?${city}?aerial`,
    };

    dispatch(postingCity(newCity));
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
      <input
        className={styles.submit}
        disabled={isPostingCity}
        type="submit"
        value="Create"
      />
    </form>
  );
}

export default NewCityTemplate;
