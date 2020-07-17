const initialState = {
  itineraries: [],
  thereAreItineraries: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITINERARIES":
      const thereAreItineraries = !(action.payload.length === 0);
      console.log(thereAreItineraries);
      return {
        ...state,
        itineraries: action.payload,
        thereAreItineraries,
      };
    case "POST_ITINERARY":
      return {
        ...state,
      };
    case "EMPTY_ITINERARIES":
      return {
        ...state,
        itineraries: [],
        thereAreItineraries: true,
      };
    default:
      return state;
  }
};
