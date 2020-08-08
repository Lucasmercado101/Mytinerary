const logInState = { isLoggingIn: false, loggingInError: null };

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  userPfp: null,
  isFetchingPfp: false,
  isDeletingUser: false,
  //
  isCreatingAccount: false,
  creatingAccountError: null,
  ...logInState,
};
//TODO: add "clear_error_message" here, to less complicate
// hooks stuff
const logIn = (state, action) => {
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
  }
};

const createAccount = (state, action) => {
  switch (action.type) {
    case "CREATING_USER":
      return {
        ...state,
        isCreatingAccount: true,
        creatingAccountError: false,
      };
    case "CREATED_USER":
      return {
        ...state,
        isCreatingAccount: false,
        creatingAccountError: false,
      };
    case "CREATING_USER_ERROR":
      return {
        ...state,
        isCreatingAccount: false,
        creatingAccountError: action.payload,
      };
  }
};

export default (state = initialState, action) => {
  const logginIn = logIn(state, action);
  if (logginIn) return { ...state, ...logginIn };

  const creatingAccount = createAccount(state, action);
  if (creatingAccount) return { ...state, ...creatingAccount };

  switch (action.type) {
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
    //TODO: Pfp still fetches if i log out in the middle of fetching, cancel the fetching
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
