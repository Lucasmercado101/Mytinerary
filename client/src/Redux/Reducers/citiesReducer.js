const initialState = {
  cities: [],
  city: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "GET_CITY":
      console.log(action.payload);
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};
