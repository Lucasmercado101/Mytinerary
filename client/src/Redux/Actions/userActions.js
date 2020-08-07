import axios from "axios";
import { getPfp, logIn as logInUser, postUser } from "../../api";

export const getUserPfp = (pfpID) => (dispatch) => {
  dispatch({
    type: "FETCHING_PFP",
  });
  getPfp(pfpID)
    .then((pfp) => {
      dispatch({
        type: "FETCHED_PFP",
        payload: pfp,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (ID) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  dispatch({
    type: "DELETING_USER",
  });
  axios
    .delete("http://localhost:5000/api/users/user/" + ID, config)
    .then(() =>
      dispatch({
        type: "DELETED_USER",
      })
    )
    .catch((err) => console.log(err));
};

export const createUser = (data, config = {}) => (dispatch) => {
  dispatch({ type: "CREATING_USER" });
  return new Promise((res, rej) =>
    postUser(data, config)
      .then(() => {
        dispatch({ type: "CREATED_USER" });
        res();
      })
      .catch((err) => dispatch({ type: "CREATING_USER_ERROR", payload: err }))
  );
};

export const logIn = (data) => (dispatch) => {
  dispatch({
    type: "LOGGING_IN",
  });
  return new Promise((res, rej) =>
    logInUser(data)
      .then((userData) => {
        dispatch({ type: "LOGGED_IN", payload: userData });
        res();
      })
      .catch((err) =>
        dispatch({
          type: "LOGGING_IN_ERROR",
          payload: err,
        })
      )
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

export const clearLoggedIn = () => {
  return {
    type: "CLEAR_LOGGED_IN",
  };
};
