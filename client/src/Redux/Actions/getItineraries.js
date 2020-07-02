import axios from "axios";

export const getItineraries = () => async (dispatch) => {
  axios
    .get("http://localhost:5000/api/itineraries")
    .then((resp) =>
      dispatch({
        type: "GET_ITINERARIES",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
