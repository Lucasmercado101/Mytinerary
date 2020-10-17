import axios from "axios";

export const getCities = () => {
  return axios.get("/api/cities").then((resp) => resp.data);
};

export const getItineraries = () => {
  return axios.get("/api/itineraries").then((resp) => resp.data);
};

type postCityProps = { cityName: string; cityCountry: string };

export const postCity = ({ cityName, cityCountry }: postCityProps) => {
  return axios.post("/api/cities", { name: cityName, country: cityCountry });
};

type postNewUserProps = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  country: string;
};

export const postNewUser = ({
  username,
  password,
  email,
  firstname,
  lastname,
  country
}: postNewUserProps) => {
  return axios.post("/api/users", {
    username,
    password,
    email,
    firstname,
    lastname,
    country
  });
};
