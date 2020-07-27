import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../../Redux/Actions/getCity";
import {
  emptyItineraries,
  getItineraries,
} from "../../Redux/Actions/itinerariesActions";
import LoadingRing from "../LoadingRing";
import Itinerary from "../Itinerary";
import NewItineraryTemplate from "../NewItineraryTemplate";
import CityCard from "../CityCard";

function CityItineraries(props) {
  const city = useSelector((state) => state.cities.city);
  const itineraries = useSelector((state) => state.itineraries.itineraries);
  const fetchingItineraries = useSelector(
    (state) => state.itineraries.fetchingItineraries
  );
  const userData = useSelector((state) => state.user.userData);
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
      <CityCard city={city.name} url={city.url} country={city.country} />

      {!fetchingItineraries ? (
        itineraries.length > 0 ? (
          <>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "500",
                margin: "0.8rem 0",
              }}
            >
              Available Itineraries
            </h2>
            <Itineraries />
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>There are no Itineraries</h2>
        )
      ) : (
        <LoadingRing centered />
      )}
      {Object.keys(userData).length !== 0 ? (
        <NewItineraryTemplate city={currentCity} />
      ) : (
        ""
      )}
    </>
  ) : (
    <LoadingRing absoluteCentered />
  );
}

export default CityItineraries;
