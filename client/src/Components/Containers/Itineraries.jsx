import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../../Redux/Actions/getCity";
import { getItineraries } from "../../Redux/Actions/getItineraries";
import { emptyItineraries } from "../../Redux/Actions/emptyItineraries";
import LoadingRing from "../LoadingRing";
import Itinerary from "../Itinerary";
import NewItineraryTemplate from "../NewItineraryTemplate";
import City from "../City";

function CityItineraries(props) {
  const city = useSelector((state) => state.cities.city);
  const itineraries = useSelector((state) => state.itineraries.itineraries);
  const userData = useSelector((state) => state.user.userData);
  const thereAreItineraries = useSelector(
    (state) => state.itineraries.thereAreItineraries
  );
  const dispatch = useDispatch();
  const currentCity = props.match.params.city;

  useEffect(() => {
    dispatch(getCity(currentCity));
    dispatch(getItineraries(currentCity));
    document.title = `${currentCity} Itineraries`;
  }, []);

  useEffect(() => {
    return () => {
      dispatch(emptyItineraries());
    };
  }, []);

  function Itineraries() {
    return itineraries.map(
      ({ _id, title, time, hashtags, creator, rating, price, activities }) => (
        <Itinerary
          key={_id}
          title={title}
          time={time}
          creator={creator}
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
      <City city={city.name} url={city.url} country={city.country} />
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
      {Object.keys(userData).length !== 0 ? (
        <NewItineraryTemplate city={currentCity} />
      ) : (
        ""
      )}
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
    </div>
  );
}

export default CityItineraries;
