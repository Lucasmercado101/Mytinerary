import axios from "axios";

export const getItineraries = (city) => async (dispatch) => {
  dispatch({ type: "FETCHING_ITINERARIES" });
  axios
    .get("http://localhost:5000/api/itineraries/" + city)
    .then((resp) => {
      dispatch({
        type: "FETCHED_ITINERARIES",
        payload: resp.data.itineraries || [],
      });
    })
    .catch((err) => console.log(err));
};

export const emptyItineraries = () => {
  return {
    type: "EMPTY_ITINERARIES",
  };
};

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
