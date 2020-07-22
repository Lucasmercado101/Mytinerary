const initialState = {
  cities: [],
  city: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CITIES":
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
