export const getLastPageVisited = (data) => {
  return {
    type: "ADD_FROM",
    payload: data,
  };
};

export const removeLastPageVisited = () => {
  return {
    type: "REMOVE_LAST_FROM",
  };
};
