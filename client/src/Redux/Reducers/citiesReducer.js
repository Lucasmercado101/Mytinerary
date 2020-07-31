const initialState = {
  cities: [],
  city: null,
  isFetching: false,
  isPostingCity: false,
  postingCityError: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_CITIES":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCHED_CITIES":
      const sortedCities = action.payload.sort(function (city, city2) {
        if (city.name < city2.name) {
          return -1;
        }
        if (city.name > city2.name) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        cities: sortedCities,
        isFetching: false,
      };

    case "GET_CITY":
      return {
        ...state,
        city: action.payload,
      };
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
