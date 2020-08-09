import {
  getPfp,
  logIn as logInUser,
  postUser,
  changePfp as changeProfilePic,
  deletePfp as deleteProfilePic,
  addPfp as addProfilePic,
  getUser,
  deleteUser as deleteAccount,
} from "../../api";

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

export const justChangedPfp = (userID) => async (dispatch) => {
  const userData = await getUser(userID).catch((err) => console.log(err));
  const pfpData = await getPfp(userData.pfp).catch((err) => console.log(err));
  console.log(userData);
  console.log(pfpData);
  dispatch({
    type: "SET_NEW_USER_PFP",
    payload: { data: pfpData, id: userData.pfp },
  });
};

export const deleteUser = (ID) => (dispatch) => {
  dispatch({
    type: "DELETING_USER",
  });
  deleteAccount(ID)
    .then(() =>
      dispatch({
        type: "DELETED_USER",
      })
    )
    .catch((err) =>
      dispatch({
        type: "DELETED_USER_ERROR",
        payload: err,
      })
    );
};

export const createUser = (data, config = {}) => (dispatch) => {
  dispatch({ type: "CREATING_USER" });
  return new Promise((res, rej) =>
    postUser(data, config)
      .then((resp) => {
        dispatch({ type: "CREATED_USER" });
        res(resp);
      })
      .catch((err) => {
        dispatch({ type: "CREATING_USER_ERROR", payload: err });
        rej(err);
      })
  );
};

export const changePfp = (pfpID, data) => (dispatch) => {
  dispatch({ type: "CHANGING_PFP" });
  return new Promise((res, rej) =>
    changeProfilePic(pfpID, data)
      .then((resp) => {
        dispatch({ type: "CHANGED_PFP" });
        res(resp);
      })
      .catch((err) => {
        dispatch({ type: "CHANGING_PFP_ERROR", payload: err });
        rej(err);
      })
  );
};

export const addPfp = (userID, data) => (dispatch) => {
  dispatch({ type: "ADDING_PFP" });
  return new Promise((res, rej) =>
    addProfilePic(userID, data)
      .then((resp) => {
        dispatch({ type: "ADDED_PFP" });
        res(resp);
      })
      .catch((err) => {
        dispatch({ type: "ADDING_PFP_ERROR", payload: err });
        rej(err);
      })
  );
};

export const deletePfp = (pfpID) => (dispatch) => {
  dispatch({ type: "DELETING_PFP" });
  return new Promise((res, rej) =>
    deleteProfilePic(pfpID)
      .then((resp) => {
        dispatch({ type: "DELETED_PFP" });
        res(resp);
      })
      .catch((err) => {
        dispatch({ type: "DELETING_PFP_ERROR", payload: err });
        rej(err);
      })
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
        res(userData);
      })
      .catch((err) => {
        dispatch({
          type: "LOGGING_IN_ERROR",
          payload: err,
        });
        rej(err);
      })
  );
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};
