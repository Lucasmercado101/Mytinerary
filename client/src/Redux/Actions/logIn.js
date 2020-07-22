import axios from "axios";

export const logIn = (data) => async (dispatch) => {
  axios
    .get("http://localhost:5000/api/users/get/", { params: data })
    .then((resp) =>
      dispatch({
        type: "LOG_IN",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
