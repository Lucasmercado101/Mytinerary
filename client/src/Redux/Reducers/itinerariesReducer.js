const initialState = {
  isPostingItinerary: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
