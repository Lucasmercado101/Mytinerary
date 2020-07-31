import axios from "axios";

export const logIn = (data) => (dispatch) => {
  dispatch({
    type: "FETCHING_LOG_IN_DATA",
  });
  axios
    .get("http://localhost:5000/api/auth/login/", { params: data })
    .then((resp) =>
      dispatch({
        type: "FETCHED_LOG_IN_DATA",
        payload: resp.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: "FETCHED_LOG_IN_DATA_FAILED",
        payload: err.response.data.message,
      })
    );
};

export const clearLogInFailure = () => {
  return {
    type: "CLEAR_LOG_IN_FAILURE",
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
