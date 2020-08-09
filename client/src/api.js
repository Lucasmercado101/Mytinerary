import axios from "axios";

const getAccessToken = () => localStorage.getItem("accessToken");

export const getCities = (config = {}) => {
  return axios
    .get("http://localhost:5000/api/cities", config)
    .then((resp) => resp.data);
};

export const getCity = (cityID, config = {}) => {
  if (!cityID) throw Error("Pass an ID to 'getCity'");
  return axios
    .get(`http://localhost:5000/api/cities/${cityID}`, config)
    .then((resp) => resp.data);
};

export const getPfp = (pfpID, config = {}) => {
  if (!pfpID) throw Error("Pass an ID to 'getPfp'");
  return axios
    .get(`http://localhost:5000/api/users/user/pfp/${pfpID}`, config)
    .then((resp) => resp.data.image);
};

export const getCityItineraries = (cityName, config = {}) => {
  if (!cityName) throw Error("Pass a city name to 'getCityItineraries'");
  return axios
    .get(
      `http://localhost:5000/api/itineraries/cityItineraries/${cityName}`,
      config
    )
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

export const getActivities = (activitiesID, config = {}) => {
  if (!activitiesID) throw Error("Pass ID to 'getActivities'");
  return axios
    .get(`http://localhost:5000/api/activities/${activitiesID}`, config)
    .then((resp) => resp.data);
};

export const logIn = (data) => {
  if (!data) throw Error("Pass data to 'logIn'");

  return axios
    .get("http://localhost:5000/api/auth/login/", { params: data })
    .then((resp) => resp.data);
};

// Need access token

export const deletePfp = (userID) => {
  if (!userID) throw Error("Pass a userID name to 'deletePfp'");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  return axios.delete(
    `http://localhost:5000/api/users/user/pfp/${userID}`,
    config
  );
};

export const deleteUser = (userID) => {
  if (!userID) throw Error("Pass a userID name to 'deleteUser'");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  return axios.delete(`http://localhost:5000/api/users/user/${userID}`, config);
};

export const changePfp = (pfpID, data) => {
  if (!pfpID) throw Error("Pass a pfpID name to 'changePfp'");
  if (!data) throw Error("Pass data to 'changePfp'");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${getAccessToken()}`,
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
      Authorization: `Bearer ${getAccessToken()}`,
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
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  return axios.post("http://localhost:5000/api/cities/", data, config);
};

export const postItinerary = (data) => {
  if (!data) throw Error("Pass data to 'postItinerary'");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  return axios.post(
    `http://localhost:5000/api/itineraries/${data.city}`,
    data,
    config
  );
};

export const deleteItinerary = (itineraryID) => {
  if (!itineraryID)
    throw Error("Pass an itineraryID name to 'deleteItinerary'");
  const config = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  return axios
    .delete(`http://localhost:5000/api/itineraries/${itineraryID}`, config)
    .catch((err) => err);
};

export const postUser = (data, config = {}) => {
  if (!data) throw Error("Pass data to 'postUser'");
  return axios.post("http://localhost:5000/api/users/create", data, {
    ...config,
  });
};
