import axios from "axios";

export const postItineraries = (data) => async (dispatch) => {
  const newItinerary = {
    city: data.city,
    itineraries: [],
  };

  axios
    .post("http://localhost:5000/api/itineraries", newItinerary)
    .then(() =>
      dispatch({
        type: "POST_ITINERARY",
      })
    )
    .catch((err) => console.log(err));
};
