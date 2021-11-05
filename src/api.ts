import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";

// TODO:
// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

export interface City {
  name: string;
  country: string;
}

export interface CityResp extends City {
  id: number;
}

interface Itinerary {
  id: number;
  title: string;
  time: number;
  price: number;
  activities: string[];
  hashtags: string[];
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

export function getCity(id: string | number) {
  return axios.get<CityResp>(`/cities/${id}`);
}
export interface CityItinerariesResponse extends Itinerary {
  creator: {
    userId: number;
    profilePic?: string;
  };
}

export function getCityItineraries(id: string | number) {
  return axios.get<CityItinerariesResponse[]>(`/cities/${id}/itinerary`);
}

export interface postNewCityItineraryCommentFnInput {
  itineraryId: string | number;
  authorId: number;
  content: string;
}

interface postNewCityItineraryCommentResponse {
  id: number;
  content: string;
  creator: { creatorId: number; profilePic?: string };
}

export function postNewCityItineraryComment({
  authorId,
  content,
  itineraryId
}: postNewCityItineraryCommentFnInput) {
  return axios.post<
    {
      authorId: number;
      content: string;
    },
    postNewCityItineraryCommentResponse
  >(`/itinerary/${itineraryId}/comment`, {
    authorId,
    content
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
