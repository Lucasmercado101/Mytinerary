import axios from "axios";

export const postItinerary = (data) => async (dispatch) => {
  axios
    .post("http://localhost:5000/api/itineraries/" + data.city, data)
    .then(() =>
      dispatch({
        type: "POST_ITINERARY",
      })
    )
    .catch((err) => console.log(err));
};
