import { useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        isFetching: true,
        fetch: true,
        fetchParams: [...action.payload],
      };
    case "FETCHED":
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        fetch: false,
      };
    case "FETCHING_ERROR":
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        fetch: false,
      };
    default:
      throw new Error();
  }
}

export function useFetch(axiosFunction, defaultValue, fetchOnMount = false) {
  const [state, dispatch] = useReducer(reducer, {
    data: defaultValue,
    error: null,
    isFetching: fetchOnMount,
    fetch: false,
    fetchParams: [],
  });

  const fetch = (...args) => {
    dispatch({ type: "FETCHING", payload: [...args] });
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    let isMounted = true;

    if (state.fetch) {
      axiosFunction(...state.fetchParams, { cancelToken: source.token })
        .then(
          (data) => isMounted && dispatch({ type: "FETCHED", payload: data })
        )
        .catch(
          (error) =>
            isMounted && dispatch({ type: "FETCHING_ERROR", payload: error })
        );
    }

    return () => {
      source.cancel();
      isMounted = false;
    };
  }, [axiosFunction, state.fetch, state.fetchParams]);

  const { data, error, isFetching } = state;
  return [data, error, isFetching, fetch];
}
