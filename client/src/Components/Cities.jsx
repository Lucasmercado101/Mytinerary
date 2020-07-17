import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCities } from "../Redux/Actions/getCities";
import City from "./City";
import NewCityTemplate from "./NewCityTemplate";
import LoadingRing from "./LoadingRing";
import styles from "../Styles/cities.module.css";

function Cities() {
  const cities = useSelector((state) => state.cities.cities);
  const [filteredCities, setFilteredCities] = useState(cities);
  const dispatch = useDispatch();
  const areThereCities = cities.length;

  useEffect(() => {
    dispatch(getCities());
  }, []);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const filterCities = (e) => {
    let searchedCity = e.target.value.toLowerCase();
    setFilteredCities(
      cities.filter((city) => city.name.toLowerCase().includes(searchedCity))
    );
  };

  return (
    <>
      <h1 className={styles.h1}>CITIES</h1>
      <div className={styles.searchBar}>
        <label htmlFor="filter">Filter by city: </label>
        <input type="text" id="filter" onChange={filterCities} />
      </div>
      {areThereCities ? (
        <ul>
          {filteredCities.map(({ _id, url, name, country }) => (
            <li key={_id}>
              <City url={url} city={name} country={country} />
            </li>
          ))}
        </ul>
      ) : (
        <LoadingRing
          style={{
            display: "block",
            margin: "10px auto",
          }}
        />
      )}
      <NewCityTemplate />
    </>
  );
}

export default Cities;
