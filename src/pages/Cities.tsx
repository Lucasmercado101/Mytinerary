import {
  CityResp,
  createCity,
  getCities,
  isLoggedIn as isLoggedInQuery
} from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

function Cities() {
  const { data: citiesData, isFetched } = useQuery("cities", getCities);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useQuery("user", isLoggedInQuery, {
    staleTime: 0,
    onSuccess: () => {
      setIsLoggedIn(true);
    }
  });
  const { mutateAsync } = useMutation(createCity);
  const [newCityName, setNewCityName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const client = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCityName || !newCountry) return;

    mutateAsync({
      name: newCityName,
      country: newCountry
    }).then(() => {
      setNewCityName("");
      client.invalidateQueries("cities");
    });
  };

  return (
    <div>
      Cities:
      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <input
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
          />
          <input
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
          />
          <button>Create city</button>
        </form>
      )}
      {isFetched && citiesData && (
        <ul>
          {citiesData.data.map((city: CityResp) => (
            <li key={city.id}>
              <div>
                {city.name}
                <br />
                {city.country}
              </div>
              <Link to={`/cities/${city.id}`}>Go to city</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cities;
