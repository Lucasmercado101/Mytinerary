import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import usePrevious from "../hooks/usePrevious";
import MyModal from "../MyModal";
import Button from "../Button";
import CityCard from "../CityCard";
import NewCityTemplate from "../NewCityTemplate";
import LoadingRing from "../LoadingRing";
import SearchBar from "../SearchBar";

function Cities() {
  const isPostingCity = useSelector((state) => state.cities.isPostingCity);
  const postingCityError = useSelector(
    (state) => state.cities.postingCityError
  );
  const userData = useSelector((state) => state.user.userData);
  const prevIsPostingCity = usePrevious(isPostingCity);
  const [isFetching, setIsFetching] = useState(true);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getCities = () => {
    return axios
      .get("http://localhost:5000/api/cities")
      .then((resp) => {
        const sortedCities = resp.data.sort(function (city, city2) {
          if (city.name < city2.name) {
            return -1;
          }
          if (city.name > city2.name) {
            return 1;
          }
          return 0;
        });
        return sortedCities;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.title = "Cities";
    let isMounted = true;
    getCities().then((sortedCities) => {
      if (isMounted) {
        setIsFetching(false);
        setCities(sortedCities);
      }
    });

    return () => (isMounted = false);
  }, [dispatch]);

  useEffect(() => {
    if (postingCityError) {
      alert(postingCityError);
      dispatch({ type: "CLEAR_POSTING_CITY_ERROR" });
    }
  }, [postingCityError, dispatch]);

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
