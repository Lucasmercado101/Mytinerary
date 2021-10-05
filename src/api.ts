import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";

export interface City {
  name: string;
}

export interface CityResp extends City {
  id: number;
}

// ------ Cities ------

export function getCities() {
  return axios.get<CityResp[]>("/cities");
}

export function createCity(city: City) {
  return axios.post("/cities", city, {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
