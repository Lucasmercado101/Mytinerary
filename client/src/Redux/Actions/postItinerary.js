import axios from "axios";

export const postItineraries = (data) => async (dispatch) => {
  axios
    .post("http://localhost:5000/api/itineraries/", data)
    .then(() =>
      dispatch({
        type: "POST_ITINERARY",
      })
    )
    .catch((err) => console.log(err));
};
