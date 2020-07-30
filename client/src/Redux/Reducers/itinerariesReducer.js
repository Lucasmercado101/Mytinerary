const initialState = {
  itineraries: [],
  fetchingItineraries: false,
  isPostingItinerary: false,
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
    case "POSTING_ITINERARY":
      return {
        ...state,
        isPostingItinerary: true,
      };
    case "POSTED_ITINERARY":
      return {
        ...state,
        isPostingItinerary: false,
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
