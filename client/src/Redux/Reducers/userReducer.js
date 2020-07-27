const initialState = {
  userData: {},
  currentlyLoggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || "",
  isFetchingLogIn: false,
  isFetchingUserLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_LOG_IN_DATA":
      return {
        ...state,
        isFetchingLogIn: true,
      };
    case "FETCHED_LOG_IN_DATA":
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload._id));
      return {
        ...state,
        isFetchingLogIn: false,
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
    case "FETCHING_LOGGED_IN_USER_DATA":
      return {
        ...state,
        isFetchingUserLoggedIn: true,
      };
    case "FETCHED_LOGGED_IN_USER_DATA":
      return {
        ...state,
        userData: action.payload,
        isFetchingUserLoggedIn: false,
      };
    default:
      return state;
  }
};
