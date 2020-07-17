import axios from "axios";

export const getItineraries = (city) => async (dispatch) => {
  axios
    .get("http://localhost:5000/api/itineraries/" + city)
    .then((resp) =>
      dispatch({
        type: "GET_ITINERARIES",
        payload: resp.data.itineraries,
      })
    )
    .catch((err) => console.log(err));
};
