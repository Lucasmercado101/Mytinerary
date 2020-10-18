import axios from "axios";

export const getCities = () => {
  return axios.get("/api/cities").then((resp) => resp.data);
};

export const getItineraries = () => {
  return axios.get("/api/itineraries").then((resp) => resp.data);
};

export const getUsers = () => {
  return axios.get("/api/users").then((resp) => resp.data);
};

type postCityProps = {
  name: string;
  country: string;
};

export const postCity = ({ name, country }: postCityProps) => {
  return axios.post("/api/cities", { name, country });
};

type postItineraryProps = {
  title: string;
  shortDescription: string;
  content: string;
  tags: [string?, string?, string?] | string[];
};

export const postItinerary = ({
  title,
  shortDescription,
  content,
  tags
}: postItineraryProps) => {
  return axios.post("/api/cities", { title, shortDescription, content, tags });
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
