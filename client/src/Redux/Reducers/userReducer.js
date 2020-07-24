const initialState = {
  userData: {},
  currentlyLoggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || "",
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload._id));
      return {
        ...state,
        userData: action.payload,
        currentlyLoggedInUser: action.payload._id,
      };
    case "LOG_OUT":
      localStorage.removeItem("loggedInUser");
      return {
        ...state,
        userData: {},
        currentlyLoggedInUser: "",
      };
    case "GET_LOGGED_IN_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
