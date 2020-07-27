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
