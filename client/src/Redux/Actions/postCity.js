import axios from "axios";

export const postCity = (data) => async (dispatch) => {
  const newCity = {
    name: data.city,
    country: data.country,
    url: data.url,
  };

  await axios
    .post("http://localhost:5000/api/cities", newCity)
    .then(() =>
      dispatch({
        type: "POST_CITY",
      })
    )
    .catch((err) => console.log(err));
};
