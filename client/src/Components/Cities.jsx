import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCities } from "../Redux/Actions/getCities";
import City from "./City";
import NewCityTemplate from "./NewCityTemplate";
import LoadingRing from "./LoadingRing";
import styles from "../Styles/cities.module.css";

function Cities() {
  const cities = useSelector((state) => state.cities.cities);
  const userData = useSelector((state) => state.user.userData);
  const [filteredCities, setFilteredCities] = useState(cities);
  const dispatch = useDispatch();
  const areThereCities = cities.length;

  useEffect(() => {
    dispatch(getCities());
    document.title = "Cities";
  }, []);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const filterCities = (e) => {
    const searchedCity = e.target.value.toLowerCase();
    let filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(searchedCity)
    );
    filteredCities = filteredCities.sort(function (city, city2) {
      if (city.name < city2.name) {
        return -1;
      }
      if (city.name > city2.name) {
        return 1;
      }
      return 0;
    });
    console.log(filteredCities);
    setFilteredCities(filteredCities);
  };

  return (
    <>
      <h1 className={styles.h1}>CITIES</h1>
      <div className={styles.searchBar}>
        <label htmlFor="filter">Filter by city: </label>
        <input
          className={styles.searchBar__input}
          type="text"
          id="filter"
          onChange={filterCities}
        />
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
      {Object.keys(userData).length !== 0 ? <NewCityTemplate /> : ""}
    </>
  );
}

export default Cities;
