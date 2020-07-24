import axios from "axios";

export const getLoggedInUserData = (data) => async (dispatch) => {
  axios
    .get(`http://localhost:5000/api/users/get/user/${data}`)
    .then((resp) =>
      dispatch({
        type: "GET_LOGGED_IN_USER_DATA",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
