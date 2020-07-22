const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };
    case "LOG_OUT":
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: {},
      };
    default:
      return state;
  }
};
