import axios from "axios";

export const getCity = (cityName) => async (dispatch) => {
  axios
    .get(`http://localhost:5000/api/cities/${cityName}`)
    .then((resp) =>
      dispatch({
        type: "GET_CITY",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
