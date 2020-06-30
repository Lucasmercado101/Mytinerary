import axios from "axios";

export const getCities = () => async (dispatch) => {
  axios
    .get("http://localhost:5000/api/cities")
    .then((resp) =>
      dispatch({
        type: "GET_CITIES",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
