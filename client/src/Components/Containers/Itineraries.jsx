import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../../Redux/Actions/getCity";
import {
  emptyItineraries,
  getItineraries,
} from "../../Redux/Actions/itinerariesActions";
import usePrevious from "../hooks/usePrevious";
import Button from "../Button";
import MyModal from "../MyModal";
import LoadingRing from "../LoadingRing";
import Itinerary from "../Itinerary";
import NewItineraryTemplate from "../NewItineraryTemplate";
import CityCard from "../CityCard";

function ItinerariesList({ itineraries }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {itineraries.map(
        ({
          _id,
          title,
          time,
          hashtags,
          creator,
          rating,
          price,
          activities,
        }) => (
          <li key={_id}>
            <Itinerary
              title={title}
              time={time}
              creator={creator}
              hashtags={hashtags}
              rating={rating}
              price={price}
              activities={activities}
            />
          </li>
        )
      )}
    </ul>
  );
}

function CityItineraries(props) {
  const city = useSelector((state) => state.cities.city);
  const itineraries = useSelector((state) => state.itineraries.itineraries);
  const userData = useSelector((state) => state.user.userData);
  const isPostingItinerary = useSelector(
    (state) => state.itineraries.isPostingItinerary
  );
  const prevIsPostingItinerary = usePrevious(isPostingItinerary);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchingItineraries = useSelector(
    (state) => state.itineraries.fetchingItineraries
  );
  const dispatch = useDispatch();
  const currentCity = props.match.params.city;

  useEffect(() => {
    dispatch(getCity(currentCity));
    dispatch(getItineraries(currentCity));
    document.title = `${currentCity} Itineraries`;

    return () => {
      dispatch(emptyItineraries());
    };
  }, []);

  useEffect(() => {
    const justPostedACity =
      isPostingItinerary === false && prevIsPostingItinerary === true;
    if (justPostedACity) {
      dispatch(emptyItineraries());
      dispatch(getItineraries(currentCity));
      setIsModalOpen(false);
    }
  }, [isPostingItinerary, prevIsPostingItinerary]);

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
            <ItinerariesList itineraries={itineraries} />
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>There are no Itineraries</h2>
        )
      ) : (
        <LoadingRing centered />
      )}
      {Object.keys(userData).length > 0 ? (
        <>
          <Button
            text="New Itinerary"
            onClick={() => setIsModalOpen(true)}
            centered
            big
            disabled={isPostingItinerary}
          />
          <MyModal
            onRequestClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
          >
            <NewItineraryTemplate city={currentCity} />
          </MyModal>
        </>
      ) : (
        ""
      )}
    </>
  ) : (
    <LoadingRing absoluteCentered />
  );
}

export default CityItineraries;
