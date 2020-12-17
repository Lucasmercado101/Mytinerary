import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getCity } from "../../api";
import { useParams } from "react-router-dom";
import CityCard from "../../Components/CityCard/CityCard";
import NotFound from "../NotFound";
import CenteredProgressCircle from "./CenteredProgressCircle";
import Itineraries from "./Itineraries";

type Params = {
  city: string;
};

const CityItineraries: React.FC = () => {
  const { city: currentCity } = useParams<Params>();

  const { data: cityData, isLoading, isError } = useQuery(
    ["city", currentCity],
    () => getCity(currentCity)
  );

  useEffect(() => {
    document.title = `${currentCity} Itineraries`;
  }, [currentCity]);

  return (
    <>
      {isLoading && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            placeItems: "center"
          }}
        >
          <CenteredProgressCircle />
        </div>
      )}
      {cityData && (
        <>
          <CityCard
            city={cityData.name}
            url={cityData.url}
            country={cityData.country}
          />
          <Itineraries />
        </>
      )}
      {isError && !cityData && <NotFound thing={"city"} />}
    </>
  );
};

export default CityItineraries;
