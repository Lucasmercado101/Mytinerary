import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCity, getCityItineraries } from "../../api";
import { useFetch } from "../hooks/useFetch";
import styles from "../../Styles/cityItineraries.module.css";

import LoadingRing from "../LoadingRing";
import CityCard from "../CityCard";
import NotFound from "./NotFound";
import Itinerary from "../Itinerary";
import NewItineraryTemplate from "../NewItineraryTemplate";

function CityItineraries(props) {
  const currentCity = props.match.params.city;
  const [notFound, setNotFound] = useState(false);
  const [city, error, isFetchingCity] = useFetch(
    getCity,
    {},
    true,
    currentCity
  );
  const cityData = Object.keys(city).length > 0;

  useEffect(() => {
    document.title = `${currentCity} Itineraries`;
  }, [currentCity]);

  useEffect(() => {
    if (error) {
      if (error.hasOwnProperty("response")) {
        error.response.status === 404 && setNotFound(true);
      } else alert(error);
    }
  }, [error]);

  return (
    <>
      {isFetchingCity && <LoadingRing absoluteCentered />}
      {cityData && (
        <>
          <CityCard city={city.name} url={city.url} country={city.country} />
          <Itineraries />
        </>
      )}
      {notFound && <NotFound thing={"city"} />}
    </>
  );
}

const Itineraries = withRouter((props) => {
  const userData = useSelector((state) => state.user.userData);
  const isLoggedIn = Object.keys(userData).length > 0;
  const currentCity = props.match.params.city;
  const [itineraries, , isFetchingItineraries, fetchItineraries] = useFetch(
    getCityItineraries,
    {},
    true,
    currentCity
  );
  const thereAreNoItineraries = Object.keys(itineraries).length === 0;

  return (
    <>
      {isFetchingItineraries ? (
        <LoadingRing centered />
      ) : thereAreNoItineraries ? (
        <h2 style={{ textAlign: "center" }}>There are no Itineraries</h2>
      ) : (
        <>
          <h2 className={styles.title}>Available Itineraries</h2>
          <ul className={styles.itineraries}>
            {itineraries.map(
              ({ _id, title, time, hashtags, creator, price, activities }) => (
                <li key={_id}>
                  <Itinerary
                    id={_id}
                    title={title}
                    time={time}
                    creator={creator}
                    hashtags={hashtags}
                    price={price}
                    activities={activities}
                    onDelete={() => fetchItineraries()}
                  />
                </li>
              )
            )}
          </ul>
        </>
      )}
      {isLoggedIn && (
        <NewItineraryTemplate
          city={currentCity}
          onPost={() => fetchItineraries()}
        />
      )}
    </>
  );
});

export default CityItineraries;
