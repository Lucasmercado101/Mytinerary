const initialState = {
  itineraries: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITINERARIES":
      return {
        ...state,
        itineraries: action.payload,
      };
    case "POST_ITINERARY":
      return {
        ...state,
      };
    default:
      return state;
  }
};
