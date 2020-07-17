const initialState = {
  cities: [],
  city: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "GET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "POST_CITY":
      return {
        ...state,
      };
    default:
      return state;
  }
};
