import { CityResp, createCity, getCities } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";

function Cities() {
  const { data: citiesData, isFetched } = useQuery("cities", getCities);
  const { mutateAsync } = useMutation(createCity);
  const [newCityName, setNewCityName] = useState("");
  const client = useQueryClient();

  return (
    <div>
      Cities:
      <input
        value={newCityName}
        onChange={(e) => setNewCityName(e.target.value)}
      />
      <button
        onClick={() => {
          mutateAsync({ name: newCityName }).then(() => {
            setNewCityName("");
            client.invalidateQueries("cities");
          });
        }}
      >
        Create city
      </button>
      {isFetched &&
        citiesData &&
        citiesData.data.map((city: CityResp) => (
          <div key={city.id}> {city.name}</div>
        ))}
    </div>
  );
}

export default Cities;
