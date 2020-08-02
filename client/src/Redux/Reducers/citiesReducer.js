const initialState = {
  isPostingCity: false,
  postingCityError: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "POSTING_CITY":
      return {
        ...state,
        isPostingCity: true,
      };
    case "POSTED_CITY":
      return {
        ...state,
        isPostingCity: false,
      };
    case "POSTING_CITY_ERROR":
      return {
        ...state,
        isPostingCity: false,
        postingCityError: action.payload,
      };
    case "CLEAR_POSTING_CITY_ERROR":
      return {
        ...state,
        postingCityError: "",
      };
    default:
      return state;
  }
};
