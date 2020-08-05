import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCities } from "../../api";
import axios from "axios";
import CityCard from "../CityCard";
import LoadingRing from "../LoadingRing";
import SearchBar from "../SearchBar";
import { useFetch } from "../hooks/useFetch";
// import usePrevious from "../hooks/usePrevious";
// import MyModal from "../MyModal";
// import Button from "../Button";
// import NewCityTemplate from "../NewCityTemplate";

function Cities() {
  const [cities, , isFetching, fetchCities] = useFetch(getCities, []);
  const [filteredCities, setFilteredCities] = useState(cities);
  {
    // const isPostingCity = useSelector((state) => state.cities.isPostingCity);
    // const postingCityError = useSelector(
    //   (state) => state.cities.postingCityError
    // );
    // const userData = useSelector((state) => state.user.userData);
    // const prevIsPostingCity = usePrevious(isPostingCity);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const dispatch = useDispatch();
  }

  useEffect(() => {
    document.title = "Cities";
    fetchCities();
  }, []);
  {
    // useEffect(() => {
    //   if (postingCityError) {
    //     alert(postingCityError);
    //     dispatch({ type: "CLEAR_POSTING_CITY_ERROR" });
    //   }
    // }, [postingCityError, dispatch]);
    // useEffect(() => {
    //   let isMounted = true;
    //   const justPostedACity =
    //     isPostingCity === false && prevIsPostingCity === true;
    //   //TODO: fix this, since removed previous dispatch
    //   //! may not work
    //   if (justPostedACity && !postingCityError) {
    //     getCities().then((sortedCities) => {
    //       if (isMounted) {
    //         setIsFetching(false);
    //         setCities(sortedCities);
    //         setIsModalOpen(false);
    //       }
    //     });
    //   }
    //   return () => (isMounted = false);
    // }, [dispatch, isPostingCity, prevIsPostingCity, postingCityError]);
  }
  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  return (
    <>
      <h1
        style={{
          color: "black",
          width: "100%",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "15px",
          marginBottom: "0",
        }}
      >
        CITIES
      </h1>
      <SearchBar
        label={"Search cities:"}
        data={cities}
        filter={"name"}
        setFilteredResults={setFilteredCities}
      />
      {isFetching ? (
        <LoadingRing
          style={{
            display: "block",
            margin: "10px auto",
          }}
        />
      ) : (
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
      )}
      {/* //TODO Re-add this */}

      {/* {Object.keys(userData).length > 0 ? (
        <>
          <Button
            text="New City"
            onClick={() => setIsModalOpen(true)}
            centered
            big
            disabled={isPostingCity}
          />
          <MyModal
            onRequestClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
          >
            <NewCityTemplate />
          </MyModal>
        </>
      ) : (
        ""
      )} */}
    </>
  );
}

export default Cities;
