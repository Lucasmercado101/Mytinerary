import axios from "axios";

export const logIn = (data) => (dispatch) => {
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

export const getPfp = (pfpID) => (dispatch) => {
  dispatch({
    type: "FETCHING_PFP",
  });
  axios
    .get(`http://localhost:5000/api/users/get/user/pfp/${pfpID}`)
    .then((resp) =>
      dispatch({
        type: "FETCHED_PFP",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteUser = (ID) => (dispatch) => {
  dispatch({
    type: "DELETING_USER",
  });
  axios
    .delete("http://localhost:5000/api/users/user/" + ID)
    .then(() =>
      dispatch({
        type: "DELETED_USER",
      })
    )
    .catch((err) => console.log(err));
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
