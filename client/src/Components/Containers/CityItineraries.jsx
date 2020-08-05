import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getCity, getCityItineraries } from "../../api";
import { useFetch } from "../hooks/useFetch";
import styles from "../../Styles/cityItineraries.module.css";

import LoadingRing from "../LoadingRing";
import CityCard from "../CityCard";
import NotFound from "./NotFound";
import Itinerary from "../Itinerary";
import NewItineraryTemplate from "../NewItineraryTemplate";
import Button from "../Button";
import MyModal from "../MyModal";

function CityItineraries(props) {
  const currentCity = props.match.params.city;
  const [notFound, setNotFound] = useState(false);
  const [city, error, isFetchingCity, fetchCities] = useFetch(
    getCity,
    {},
    true,
    currentCity
  );
  const cityData = Object.keys(city).length > 0;

  // useEffect(fetchCities, []);

  useEffect(() => {
    document.title = `${currentCity} Itineraries`;
  }, []);

  useEffect(() => {
    if (error) {
      error.response.status !== 404 && alert(error);
      error.response.status === 404 && setNotFound(true);
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

  {
    // return (
    //   <>
    //       {/* <Button
    //             text="New Itinerary"
    //             onClick={() => setIsModalOpen(true)}
    //             centered
    //             big
    //             disabled={isPostingItinerary}
    //           />
    //           <MyModal
    //             onRequestClose={() => setIsModalOpen(false)}
    //             isOpen={isModalOpen}
    //           >
    //             <NewItineraryTemplate city={currentCity} />
    //           </MyModal> */}
    //   </>
    // );
  }
}

const Itineraries = withRouter((props) => {
  const currentCity = props.match.params.city;
  const [itineraries, , isFetchingItineraries, fetchItineraries] = useFetch(
    getCityItineraries,
    {},
    true,
    currentCity
  );
  const thereAreNoItineraries = Object.keys(itineraries).length === 0;

  useEffect(() => {
    console.log(isFetchingItineraries);
  }, [isFetchingItineraries]);

  {
    // const [itineraries, setItineraries] = useState({});
    // const [fetchingItineraries, setFetchingItineraries] = useState(true);
    // const [deletedAnItinerary, setDeletedAnItinerary] = useState(false);
    // useEffect(() => {
    //   const currentCity = props.match.params.city;
    //   let isMounted = true;
    //   getCityItineraries(currentCity)
    //     .then((itineraries) => {
    //       if (isMounted) {
    //         setFetchingItineraries(false);
    //         setItineraries(itineraries);
    //       }
    //     })
    //     .catch((err) => console.log(err));
    //   return () => (isMounted = false);
    // }, [props.match.params.city]);
    // useEffect(() => {
    //   let isMounted = true;
    //   if (deletedAnItinerary) {
    //     setItineraries({});
    //     setFetchingItineraries(true);
    //     setDeletedAnItinerary(false);
    //     const currentCity = props.match.params.city;
    //     getCityItineraries(currentCity)
    //       .then((itineraries) => {
    //         if (isMounted) {
    //           setFetchingItineraries(false);
    //           setItineraries(itineraries);
    //         }
    //       })
    //       .catch((err) => console.log(err));
    //   }
    //   return () => (isMounted = false);
    // }, [deletedAnItinerary, props.match.params.city]);
  }

  return (
    <>
      {isFetchingItineraries ? (
        <LoadingRing centered />
      ) : thereAreNoItineraries ? (
        <h2 style={{ textAlign: "center" }}>There are no Itineraries</h2>
      ) : (
        <>
          <h2 className={styles.title}>Available Itineraries</h2>
          <div className={styles.itineraries}>
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
                <Itinerary
                  key={_id}
                  id={_id}
                  title={title}
                  time={time}
                  creator={creator}
                  hashtags={hashtags}
                  rating={rating}
                  price={price}
                  activities={activities}
                  // onDelete={() => setDeletedAnItinerary(true)}
                />
              )
            )}
          </div>
        </>
      )}
    </>
  );
});

export default CityItineraries;
