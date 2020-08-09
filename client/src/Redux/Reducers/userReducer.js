const logInState = { isLoggingIn: false, loggingInError: null };
const changingPfpState = { isChangingPfp: false, changingPfpError: null };
const deletingPfpState = { isDeletingPfp: false, deletingPfpError: null };
const addingPfpState = { isAddingPfp: false, addingPfpError: null };
const deletingAccountState = {
  isDeletingUser: false,
  deletingUserError: null,
};
const creatingAccountState = {
  isCreatingAccount: false,
  creatingAccountError: null,
};

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
  userPfp: null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || false,
  isFetchingPfp: false,
  ...deletingAccountState,
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
      action.payload.userData.isAdmin &&
        localStorage.setItem(
          "isAdmin",
          JSON.stringify(action.payload.userData.isAdmin)
        );
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        isLoggingIn: false,
        userData: action.payload.userData,
        isAdmin: action.payload.userData.isAdmin
          ? action.payload.userData.isAdmin
          : false,
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
        creatingAccountError: null,
      };
    case "CREATED_USER":
      return {
        ...state,
        isCreatingAccount: false,
        creatingAccountError: null,
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
        changingPfpError: null,
      };
    case "CHANGED_PFP":
      return {
        ...state,
        isChangingPfp: false,
        changingPfpError: null,
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
        addingPfpError: null,
      };
    case "ADDED_PFP":
      return {
        ...state,
        isAddingPfp: false,
        addingPfpError: null,
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
  }
};

const deletingUser = (state, action) => {
  switch (action.type) {
    case "DELETING_USER":
      return {
        ...state,
        isDeletingUser: true,
        deletingUserError: null,
      };
    case "DELETED_USER":
      localStorage.removeItem("userData");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isDeletingUser: false,
        deletingUserError: null,
        userPfp: null,
        isAdmin: false,
        userData: {},
      };
    case "DELETING_USER_ERROR":
      return {
        ...state,
        isDeletingUser: null,
        deletingUserError: action.payload,
      };
  }
};

export default (state = initialState, action) => {
  const logginIn = logIn(state, action);
  if (logginIn) return { ...state, ...logginIn };

  const deletingUserAccount = deletingUser(state, action);
  if (deletingUserAccount) return { ...state, ...deletingUserAccount };

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
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        userData: {},
        isAdmin: false,
        userPfp: null,
      };
    default:
      return state;
  }
};
