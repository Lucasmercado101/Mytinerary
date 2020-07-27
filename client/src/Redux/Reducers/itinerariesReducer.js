const initialState = {
  itineraries: [],
  fetchingItineraries: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_ITINERARIES":
      return {
        ...state,
        fetchingItineraries: true,
      };
    case "FETCHED_ITINERARIES":
      return {
        ...state,
        itineraries: action.payload,
        fetchingItineraries: false,
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
