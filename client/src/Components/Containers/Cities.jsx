import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCities } from "../../api";
import { useFetch } from "../hooks/useFetch";

import CityCard from "../CityCard";
import LoadingRing from "../LoadingRing";
import SearchBar from "../SearchBar";
import NewCityTemplate from "../NewCityTemplate";

function Cities() {
  const userData = useSelector((state) => state.user.userData);
  const [cities, , isFetchingCities, fetchCities] = useFetch(
    getCities,
    [],
    true
  );
  const [filteredCities, setFilteredCities] = useState([]);
  const isLoggedIn = Object.keys(userData).length > 0;
  const thereAreCities = cities.length > 0;

  useEffect(fetchCities, []);

  useEffect(() => {
    document.title = "Cities";
  }, []);

  useEffect(() => {
    cities.length > 0 && setFilteredCities(cities);
  }, [cities]);

  return (
    <>
      <h1
        style={{
          fontWeight: "300",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        CITIES
      </h1>

      {!isFetchingCities ? (
        thereAreCities ? (
          <>
            <SearchBar
              label={"Search cities:"}
              data={cities}
              filter={"name"}
              setFilteredResults={setFilteredCities}
            />
            <ul>
              {filteredCities.map(({ _id, url, name, country }) => (
                <li key={_id}>
                  <CityCard
                    style={{ margin: "5px auto" }}
                    link
                    url={url}
                    city={name}
                    country={country}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>There are no cities</h2>
        )
      ) : (
        <LoadingRing centered />
      )}

      {isLoggedIn && <NewCityTemplate onPost={fetchCities} />}
    </>
  );
}

export default Cities;
