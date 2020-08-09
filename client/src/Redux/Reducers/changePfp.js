const intialState = { isChangingPfp: false, changingPfpError: null };

export default (state = intialState, action) => {
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
    default:
      return state;
  }
};
