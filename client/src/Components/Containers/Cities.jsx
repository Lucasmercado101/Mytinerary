import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyModal from "../MyModal";
import Button from "../Button";
import { getCities } from "../../Redux/Actions/citiesActions";
import CityCard from "../CityCard";
import NewCityTemplate from "../NewCityTemplate";
import LoadingRing from "../LoadingRing";
import SearchBar from "../SearchBar";

function Cities() {
  const cities = useSelector((state) => state.cities.cities);
  const isFetching = useSelector((state) => state.cities.isFetching);
  const loggedInUser = useSelector((state) => state.user.currentlyLoggedInUser);
  const [filteredCities, setFilteredCities] = useState(cities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
    document.title = "Cities";
  }, []);

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
      {loggedInUser ? (
        <>
          <Button
            text={"New City"}
            onClick={() => setIsModalOpen(true)}
            centered
            big
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
      )}
      {/* {loggedInUser ? <NewCityTemplate /> : ""} */}
    </>
  );
}

export default Cities;
