import axios from "axios";

export const postingCity = (data) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  if (data) {
    dispatch({
      type: "POSTING_CITY",
    });

    await axios
      .post("http://localhost:5000/api/cities/", data, config)
      .then(async () => {
        const newItinerary = {
          city: data.city,
          itineraries: [],
        };
        await axios
          .post("http://localhost:5000/api/itineraries/", newItinerary, config)
          .then(() =>
            dispatch({
              type: "POSTED_CITY",
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) =>
        dispatch({
          type: "POSTING_CITY_ERROR",
          payload: err.response.statusText,
        })
      );
  }
};
