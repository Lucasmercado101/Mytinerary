import axios from "axios";

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
