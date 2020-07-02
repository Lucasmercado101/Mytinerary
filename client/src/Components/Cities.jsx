import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCities } from "../Redux/Actions/getCities";
import MyLink from "./MyLink";
import NewCityTemplate from "./NewCityTemplate";
import LoadingRing from "./LoadingRing";
import "../Styles/cities.css";

function Cities(props) {
  const cities = useSelector((state) => state.cities.cities);
  const [filteredCities, setFilteredCities] = useState(cities);
  const dispatch = useDispatch();
  const areThereCities = cities.length;

  //on mount
  useEffect(() => {
    dispatch(getCities());
  }, []);

  //on cities update
  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const filterCities = (e) => {
    let searchedCity = e.target.value.toLowerCase();
    setFilteredCities(
      cities.filter((city) => city.name.toLowerCase().includes(searchedCity))
    );
  };

  function FilteredCities() {
    return (
      <ul>
        {filteredCities.map(({ _id, url, name, country }) => (
          <li
            key={_id}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
         url(${url})`,
              backgroundSize: "cover",
              zIndex: 1,
            }}
            className="city"
          >
            <MyLink to={`/cities/${name}`}>
              {name}
              <small>{country}</small>
            </MyLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="search">
        <h1>CITIES</h1>
        <div className="searchbar">
          <label htmlFor="filter">Filter by city: </label>
          <input type="text" id="filter" onChange={filterCities} />
        </div>
      </div>
      {areThereCities ? (
        <FilteredCities />
      ) : (
        <div
          style={{
            width: "25%",
            margin: "25px auto",
          }}
        >
          <LoadingRing />
        </div>
      )}
      <NewCityTemplate />
    </div>
  );
}

export default Cities;
