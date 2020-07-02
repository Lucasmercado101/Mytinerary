import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../Redux/Actions/getCity";
import LoadingRing from "./LoadingRing";
import Itinerary from "./Itinerary";
import NewItineraryTemplate from "./NewItineraryTemplate";
import styles from "../Styles/city.module.css";

function City(props) {
  const city = useSelector((state) => state.cities.city);
  const itineraries = useSelector((state) => state.itineraries.itineraries);
  const dispatch = useDispatch();
  const currentCity = props.match.params.city;

  const newItinerary = {
    title: "title",
    rating: "89",
    time: "12HS",
    price: "100",
    activities: "4163",
    hashtags: ["Art", "Architecture", "History"],
  };

  useEffect(() => {
    dispatch(getCity(currentCity));
  }, []);

  function Header() {
    return (
      <header
        className="city-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
url(${city.url})`,
          backgroundSize: "cover",
          zIndex: 1,
        }}
      >
        <div className={styles.header}>
          <h1 className={styles.cityName}>{city.name}</h1>
          <small>{city.country}</small>
        </div>
      </header>
    );
  }

  return (
    <div>
      {city ? <Header /> : <LoadingRing />}
      <h2 className={styles.availableText}>Available Itineraries</h2>
      <Itinerary />
      <NewItineraryTemplate />
    </div>
  );
}

export default City;
