import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCities } from "../api";
import { useQuery } from "react-query";

import CityCard from "../Components/CityCard/CityCard";
import SearchBar from "../Components/SearchBar";
import NewCityTemplate from "../Components/NewCityTemplate";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loadingBar: {
    display: "block",
    margin: "auto",
    marginTop: 150
  }
});

function Cities() {
  const { loadingBar } = useStyles();
  const userData = useSelector((state: GlobalState) => state.user.userData);
  const isLoggedIn = Object.keys(userData).length > 0;
  const { data: cities, isLoading, refetch } = useQuery("cities", getCities);
  const thereAreCities = cities && cities.length > 0;
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    document.title = "Cities";
  }, []);

  useEffect(() => {
    thereAreCities && setFilteredCities(cities);
  }, [cities]);

  return (
    <>
      <h1
        style={{
          fontWeight: 300,
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        CITIES
      </h1>

      {!isLoading ? (
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
        <CircularProgress className={loadingBar} />
      )}

      {isLoggedIn && <NewCityTemplate onPost={refetch} />}
    </>
  );
}

export default Cities;
