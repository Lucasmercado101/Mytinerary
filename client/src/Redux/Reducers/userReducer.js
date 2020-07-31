const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  userPfp: null,
  isFetchingLogIn: false,
  isFetchingUserLoggedIn: false,
  failedLogIn: null,
  isFetchingPfp: false,
  isDeletingUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_LOG_IN_DATA":
      return {
        ...state,
        isFetchingLogIn: true,
      };
    case "FETCHED_LOG_IN_DATA":
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isFetchingLogIn: false,
        userData: action.payload.userData,
      };
    case "FETCHED_LOG_IN_DATA_FAILED":
      return {
        ...state,
        isFetchingLogIn: false,
        failedLogIn: action.payload,
      };
    case "FETCHING_PFP":
      return {
        ...state,
        userPfp: action.payload,
        isFetchingPfp: true,
      };
    case "FETCHED_PFP":
      return {
        ...state,
        userPfp: action.payload,
        isFetchingPfp: false,
      };
    case "CLEAR_LOG_IN_FAILURE":
      return {
        ...state,
        failedLogIn: null,
      };
    case "DELETING_USER":
      return {
        ...state,
        isDeletingUser: true,
      };
    case "DELETED_USER":
      return {
        ...state,
        isDeletingUser: false,
      };
    case "SET_USER_DATA":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };
    case "CLEAR_PFP":
      return {
        ...state,
        userPfp: null,
      };
    case "LOG_OUT":
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        userData: {},
        userPfp: null,
      };
    default:
      return state;
  }
};
