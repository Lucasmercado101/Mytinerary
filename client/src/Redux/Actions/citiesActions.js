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

export const postingCity = (data) => async (dispatch) => {
  if (data) {
    dispatch({
      type: "POSTING_CITY",
    });
    await axios
      .post("http://localhost:5000/api/cities", data)
      .then(async () => {
        const newItinerary = {
          city: data.city,
          itineraries: [],
        };
        await axios
          .post("http://localhost:5000/api/itineraries", newItinerary)
          .then(() =>
            dispatch({
              type: "POSTED_CITY",
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
};
