const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  userPfp: null,
  isFetchingPfp: false,
  //
  isDeletingUser: false,
  deletingUserError: null,
  //
  isDeletingPfp: false,
  deletingPfpError: null,
  //
  isLoggingIn: false,
  loggingInError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGGING_IN":
      return {
        ...state,
        isLoggingIn: true,
        loggingInError: "",
      };
    case "LOGGED_IN":
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isLoggingIn: false,
        userData: action.payload.userData,
      };
    case "LOGGING_IN_ERROR":
      return {
        ...state,
        isLoggingIn: false,
        loggingInError: action.payload,
      };
    case "DELETING_PFP":
      return {
        ...state,
        isDeletingPfp: true,
        deletingPfpError: null,
      };
    case "DELETED_PFP":
      const newUserData = state.userData;
      delete newUserData.pfp;
      return {
        ...state,
        isDeletingPfp: false,
        deletingPfpError: null,
        userPfp: null,
        userData: newUserData,
      };
    case "DELETING_PFP_ERROR":
      return {
        ...state,
        isDeletingPfp: false,
        deletingPfpError: action.payload,
      };
    case "DELETING_USER":
      return {
        ...state,
        isDeletingUser: true,
        deletingUserError: null,
      };
    case "DELETED_USER":
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isDeletingUser: false,
        deletingUserError: null,
        userPfp: null,
        userData: {},
      };
    case "DELETING_USER_ERROR":
      return {
        ...state,
        isDeletingUser: null,
        deletingUserError: action.payload,
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
    case "SET_USER_DATA":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };
    case "SET_NEW_USER_PFP":
      if (Object.keys(state.userData).length > 0) {
        let userDataWithPfp = { ...state.userData, pfp: action.payload.id };
        localStorage.setItem("userData", JSON.stringify(userDataWithPfp));

        return {
          ...state,
          userPfp: action.payload.data,
          userData: userDataWithPfp,
        };
      } else {
        return {
          ...state,
        };
      }
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
