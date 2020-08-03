import axios from "axios";

export const getCities = (config = {}) => {
  return axios
    .get("http://localhost:5000/api/cities", config)
    .then((resp) => {
      const sortedCities = resp.data.sort(function (city, city2) {
        if (city.name < city2.name) {
          return -1;
        }
        if (city.name > city2.name) {
          return 1;
        }
        return 0;
      });
      return sortedCities;
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const getCity = (cityID) => {
  if (!cityID) throw Error("Pass an ID to 'getCity'");
  return axios
    .get(`http://localhost:5000/api/cities/${cityID}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw Error(err);
    });
};

export const getPfp = (pfpID, config = {}) => {
  if (!pfpID) throw Error("Pass an ID to 'getPfp'");
  return axios
    .get(`http://localhost:5000/api/users/user/pfp/${pfpID}`, config)
    .then((resp) => resp.data.image)
    .catch((err) => {
      throw Error(err);
    });
};

export const getCityItineraries = (cityName) => {
  if (!cityName) throw Error("Pass a city name to 'getCityItineraries'");
  return axios
    .get(`http://localhost:5000/api/itineraries/cityItineraries/${cityName}`)
    .then((resp) => resp.data)
    .catch((err) => {
      throw Error(err);
    });
};

export const getUser = (userID, config = {}) => {
  if (!userID) throw Error("Pass a userID name to 'getUser'");
  return axios
    .get(`http://localhost:5000/api/users/user/${userID}`, config)
    .then((resp) => resp.data)
    .catch((err) => {
      throw Error(err);
    });
};

export const getUsers = (config = {}) => {
  return axios
    .get("http://localhost:5000/api/users", config)
    .then((resp) => resp.data)
    .catch((err) => {
      throw Error(err);
    });
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
    .then((resp) => resp.data)
    .catch((err) => {
      throw Error(err);
    });
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

  return axios
    .put(`http://localhost:5000/api/users/user/pfp/${pfpID}`, data, config)
    .catch((err) => {
      throw Error(err);
    });
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

  return axios
    .post(`http://localhost:5000/api/users/user/pfp/${userID}`, data, config)
    .catch((err) => {
      throw Error(err);
    });
};
