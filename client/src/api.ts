import axios from "axios";

export const getCities = () => {
  return axios.get("/api/cities").then((resp) => resp.data);
};
