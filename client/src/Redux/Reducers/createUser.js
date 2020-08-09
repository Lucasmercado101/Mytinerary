const initialState = {
  isCreatingAccount: false,
  creatingAccountError: null,
};

export default (state = initialState, action) => {
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
    default:
      return state;
  }
};
