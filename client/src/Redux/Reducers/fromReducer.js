const initialState = {
  from: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FROM":
      return {
        ...state,
        from: [...state.from, action.payload],
      };
    case "REMOVE_LAST_FROM":
      let prevFrom = state.from;
      prevFrom.pop();
      return {
        ...state,
        from: prevFrom,
      };
    default:
      return state;
  }
};
