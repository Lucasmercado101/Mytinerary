const initialState = { isAddingPfp: false, addingPfpError: null };

export default (state = initialState, action) => {
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
    default:
      return state;
  }
};
