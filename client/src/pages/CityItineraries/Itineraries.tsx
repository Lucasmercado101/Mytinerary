import React from "react";
import Itinerary from "../../Components/Itinerary/Itinerary";
import NewItineraryTemplate from "../../Components/NewItineraryTemplate";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCityItineraries } from "../../api";
import CenteredProgressCircle from "./CenteredProgressCircle";
import useStyles from "./Styles";

type Params = {
  city: string;
};

const Itineraries = () => {
  const { title, itinerariesStyle } = useStyles();
  const { city: currentCity } = useParams<Params>();
  const userData = useSelector((state: GlobalState) => state.user.userData);
  const isLoggedIn = Object.keys(userData).length > 0;

  const { data: itineraries, isLoading, refetch } = useQuery(
    ["itineraries", currentCity],
    () => getCityItineraries(currentCity)
  );

  return (
    <>
      {isLoading ? (
        <CenteredProgressCircle />
      ) : !itineraries ? (
        <h2 style={{ textAlign: "center" }}>There are no Itineraries</h2>
      ) : (
        <>
          <h2 className={title}>Available Itineraries</h2>
          <ul className={itinerariesStyle}>
            {itineraries.map(
              ({
                _id,
                title,
                time,
                hashtags,
                creator,
                price,
                activities
              }: Itinerary) => (
                <li key={_id}>
                  <Itinerary
                    id={_id}
                    title={title}
                    time={time}
                    creator={creator}
                    hashtags={hashtags}
                    price={price}
                    activities={activities}
                    onDelete={() => refetch()}
                  />
                </li>
              )
            )}
          </ul>
        </>
      )}
      {isLoggedIn && (
        <NewItineraryTemplate city={currentCity} onPost={() => refetch()} />
      )}
    </>
  );
};

export default Itineraries;
