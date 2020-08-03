import axios from "axios";
import { getPfp } from "../../api";

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
