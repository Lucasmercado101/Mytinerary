import axios from "axios";

export const postItinerary = (data) => async (dispatch) => {
  dispatch({
    type: "POSTING_ITINERARY",
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  axios
    .post(`http://localhost:5000/api/itineraries/${data.city}`, data, config)
    .then(() => {
      dispatch({
        type: "POSTED_ITINERARY",
      });
    })
    .catch((err) => console.log(err));
};
