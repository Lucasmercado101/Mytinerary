import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCity } from "../Redux/Actions/postCity";
import { postItineraries } from "../Redux/Actions/postCreateCityItineraries";
import DropdownMenu from "./DropdownMenu";
import styles from "../Styles/newCityTemplate.module.css";

const styled = {
  listStyle: "none",
  textAlign: "center",
  color: "white",
  width: "50%",
  backgroundColor: "rgb(49, 49, 49)",
  margin: "0 auto",
  padding: "8px 0",
  fontWeight: 300,
  fontSize: "1.2rem",
  borderRadius: "25px",
};

const styledButton = {
  listStyle: "none",
  color: "white",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%",
  backgroundColor: "rgb(49, 49, 49)",
  padding: "8px 0",
  fontWeight: 300,
  fontSize: "1.2rem",
  borderRadius: "25px",
};

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
    <DropdownMenu
      style={{ width: "100%", zIndex: 1 }}
      button={<p style={{ ...styled }}>New City</p>}
    >
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
    </DropdownMenu>
  );
}

export default NewCityTemplate;
