import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../Redux/Actions/getCity";
import { getItineraries } from "../Redux/Actions/getItineraries";
import { emptyItineraries } from "../Redux/Actions/emptyItineraries";
import LoadingRing from "./LoadingRing";
import Itinerary from "./Itinerary";
import NewItineraryTemplate from "./NewItineraryTemplate";
import City from "./City";

function CityItineraries(props) {
  const city = useSelector((state) => state.cities.city);
  const itineraries = useSelector((state) => state.itineraries.itineraries);
  const thereAreItineraries = useSelector(
    (state) => state.itineraries.thereAreItineraries
  );
  const dispatch = useDispatch();
  const currentCity = props.match.params.city;

  useEffect(() => {
    dispatch(getCity(currentCity));
    dispatch(getItineraries(currentCity));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(emptyItineraries());
    };
  }, []);

  function Itineraries() {
    return itineraries.map(
      ({ _id, title, hashtags, rating, price, activities }) => (
        <Itinerary
          key={_id}
          title={title}
          hashtags={hashtags}
          rating={rating}
          price={price}
          activities={activities}
        />
      )
    );
  }

  return city ? (
    <>
      <City city={city.name} country={city.country} />
      <h2
        style={{ textAlign: "center", fontWeight: "500", margin: "0.8rem 0" }}
      >
        Available Itineraries
      </h2>
      {thereAreItineraries ? (
        itineraries !== undefined && itineraries.length ? (
          <Itineraries />
        ) : (
          <LoadingRing
            style={{
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        )
      ) : (
        <p style={{ textAlign: "center" }}>There are no Itineraries</p>
      )}
      <NewItineraryTemplate city={currentCity} />
    </>
  ) : (
    <div>
      <LoadingRing
        style={{
          display: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <NewItineraryTemplate city={currentCity} />
    </div>
  );
}

export default CityItineraries;
