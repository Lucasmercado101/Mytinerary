import axios from "axios";

export const getCities = (config = {}) => {
  return axios
    .get("http://localhost:5000/api/cities", config)
    .then((resp) => resp.data);
};

export const getCity = (cityID) => {
  if (!cityID) throw Error("Pass an ID to 'getCity'");
  return axios
    .get(`http://localhost:5000/api/cities/${cityID}`)
    .then((resp) => resp.data);
};

export const getPfp = (pfpID, config = {}) => {
  if (!pfpID) throw Error("Pass an ID to 'getPfp'");
  return axios
    .get(`http://localhost:5000/api/users/user/pfp/${pfpID}`, config)
    .then((resp) => resp.data.image);
};

export const getCityItineraries = (cityName) => {
  if (!cityName) throw Error("Pass a city name to 'getCityItineraries'");
  return axios
    .get(`http://localhost:5000/api/itineraries/cityItineraries/${cityName}`)
    .then((resp) => resp.data);
};

export const getUser = (userID, config = {}) => {
  if (!userID) throw Error("Pass a userID name to 'getUser'");
  return axios
    .get(`http://localhost:5000/api/users/user/${userID}`, config)
    .then((resp) => resp.data);
};

export const getUsers = (config = {}) => {
  return axios
    .get("http://localhost:5000/api/users", config)
    .then((resp) => resp.data);
};

export const deletePfp = (userID) => {
  if (!userID) throw Error("Pass a userID name to 'getUser'");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  return axios
    .delete(`http://localhost:5000/api/users/user/pfp/${userID}`, config)
    .then((resp) => resp.data);
};

export const changePfp = (pfpID, data) => {
  if (!pfpID) throw Error("Pass a pfpID name to 'changePfp'");
  if (!data) throw Error("Pass data to 'changePfp'");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  return axios.put(
    `http://localhost:5000/api/users/user/pfp/${pfpID}`,
    data,
    config
  );
};

export const addPfp = (userID, data) => {
  if (!userID) throw Error("Pass a userID name to 'addPfp'");
  if (!data) throw Error("Pass data to 'addPfp'");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  return axios.post(
    `http://localhost:5000/api/users/user/pfp/${userID}`,
    data,
    config
  );
};

export const postCity = (data) => {
  if (!data) throw Error("Pass data to 'postCity'");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  return axios.post("http://localhost:5000/api/cities/", data, config);
};

export const postItinerary = (data) => {
  if (!data) throw Error("Pass data to 'postCity'");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  return axios.post(
    `http://localhost:5000/api/itineraries/${data.city}`,
    data,
    config
  );
};
