const logInState = { isLoggingIn: false, loggingInError: null };
const changingPfpState = { isChangingPfp: false, changingPfpError: null };
const deletingPfpState = { isDeletingPfp: false, deletingPfpError: null };
const addingPfpState = { isAddingPfp: false, addingPfpError: null };
const creatingAccountState = {
  isCreatingAccount: false,
  creatingAccountError: null,
};

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  userPfp: null,
  isFetchingPfp: false,
  isDeletingUser: false,
  //.
  ...addingPfpState,
  ...deletingPfpState,
  ...changingPfpState,
  ...creatingAccountState,
  ...logInState,
};

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

const changeProfilePic = (state, action) => {
  switch (action.type) {
    case "CHANGING_PFP":
      return {
        ...state,
        isChangingPfp: true,
        changingPfpError: false,
      };
    case "CHANGED_PFP":
      return {
        ...state,
        isChangingPfp: false,
        changingPfpError: false,
      };
    case "CHANGING_PFP_ERROR":
      return {
        ...state,
        isChangingPfp: false,
        changingPfpError: action.payload,
      };
  }
};

const addingProfilePic = (state, action) => {
  switch (action.type) {
    case "ADDING_PFP":
      return {
        ...state,
        isAddingPfp: true,
        addingPfpError: false,
      };
    case "ADDED_PFP":
      return {
        ...state,
        isAddingPfp: false,
        addingPfpError: false,
      };
    case "ADDING_PFP_ERROR":
      return {
        ...state,
        isAddingPfp: false,
        addingPfpError: action.payload,
      };
  }
};

const deleteProfilePic = (state, action) => {
  switch (action.type) {
    case "DELETING_PFP":
      return {
        ...state,
        isDeletingPfp: true,
        deletingPfpError: false,
      };
    case "DELETED_PFP":
      return {
        ...state,
        isDeletingPfp: false,
        deletingPfpError: false,
      };
    case "DELETING_PFP_ERROR":
      return {
        ...state,
        isDeletingPfp: false,
        deletingPfpError: action.payload,
      };
  }
};

export default (state = initialState, action) => {
  const logginIn = logIn(state, action);
  if (logginIn) return { ...state, ...logginIn };

  const addingPfp = addingProfilePic(state, action);
  if (addingPfp) return { ...state, ...addingPfp };

  const deletingPfp = deleteProfilePic(state, action);
  if (deletingPfp) return { ...state, ...deletingPfp };

  const changingPfp = changeProfilePic(state, action);
  if (changingPfp) return { ...state, ...changingPfp };

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
    case "JUST_DELETED_PFP":
      const data = state.userData;
      delete data.pfp;
      return {
        ...state,
        userPfp: null,
        userData: data,
      };
    case "SET_NEW_USER_PFP":
      let userDataWithPfp = state.userData;
      userDataWithPfp = { ...state.userData, pfp: action.pfpId };
      console.log(userDataWithPfp, action.pfpId);
      localStorage.setItem("userData", JSON.stringify(userDataWithPfp));

      return {
        ...state,
        userPfp: action.pfpData,
        userData: userDataWithPfp,
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
