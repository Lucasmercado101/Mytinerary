export const getLastPageVisited = (data) => {
  return {
    type: "ADD_FROM",
    payload: data,
  };
};
