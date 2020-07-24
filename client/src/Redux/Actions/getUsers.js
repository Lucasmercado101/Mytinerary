import axios from "axios";

export const getUsers = () => async (dispatch) => {
  axios
    .get("http://localhost:5000/api/users")
    .then((resp) =>
      dispatch({
        type: "GET_USERS",
        payload: resp.data,
      })
    )
    .catch((err) => console.log(err));
};
