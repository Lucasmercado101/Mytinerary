import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";

export interface City {
  name: string;
  country: string;
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

// ------ Auth ------

export function login({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  return axios.post(
    "/auth/login",
    { username, password },
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );
}

export function isLoggedIn() {
  return axios.get("/auth/isLoggedIn", { withCredentials: true });
}

export function register({
  username,
  password
}: {
  username: string;
  password: string;
}) {
  return axios.post(
    "/auth/register",
    { username, password },
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );
}

export function registerWithProfilePic({
  username,
  password,
  profilePic
}: {
  username: string;
  password: string;
  profilePic: File;
}) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("profilePic", profilePic);
  return axios.post("/auth/register", formData, {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  });
}
