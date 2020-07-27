import axios from "axios";

export const logIn = (data) => async (dispatch) => {
  dispatch({
    type: "FETCHING_LOG_IN_DATA",
  });
  axios
    .get("http://localhost:5000/api/users/get/", { params: data })
    .then((resp) =>
      dispatch({
        type: "FETCHED_LOG_IN_DATA",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getLoggedInUserData = (data) => async (dispatch) => {
  dispatch({
    type: "FETCHING_LOGGED_IN_USER_DATA",
  });
  axios
    .get(`http://localhost:5000/api/users/get/user/${data}`)
    .then((resp) =>
      dispatch({
        type: "FETCHED_LOGGED_IN_USER_DATA",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
