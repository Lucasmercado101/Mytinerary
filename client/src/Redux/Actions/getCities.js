import axios from "axios";

export const getCities = () => async (dispatch) => {
  axios
    .get(
      "http://localhost:5000/api/cities"
      // console log the percentage downloaded
      //  {
      //   onDownloadProgress: (progressEvent) =>
      //     console.log(
      //       Math.round(progressEvent.loaded / progressEvent.total) * 100
      //     ),
      // }
    )
    .then((resp) =>
      dispatch({
        type: "GET_CITIES",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
