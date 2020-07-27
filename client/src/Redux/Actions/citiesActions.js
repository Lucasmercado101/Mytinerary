import axios from "axios";

export const getCities = () => async (dispatch) => {
  dispatch({
    type: "FETCHING_CITIES",
  });
  axios
    .get("http://localhost:5000/api/cities")
    .then((resp) => {
      dispatch({
        type: "FETCHED_CITIES",
        payload: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "FETCHING_CITIES_ERROR",
      });
    });
};
