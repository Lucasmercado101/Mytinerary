import { useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FETCHING":
      return { ...state, isFetching: true, fetch: true };
    case "FETCHED":
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        fetch: false,
      };
    case "FETCHING_ERROR":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        fetch: false,
      };
    default:
      throw new Error();
  }
}

export function useFetch(axiosFunction, defaultValue) {
  const [state, dispatch] = useReducer(reducer, {
    data: defaultValue,
    error: null,
    isFetching: false,
    fetch: false,
  });

  const fetch = () => {
    dispatch({ type: "FETCHING" });
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    let isMounted = true;

    if (state.fetch) {
      axiosFunction({ cancelToken: source.token })
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
  }, [axiosFunction, state.fetch]);

  const { data, error, isFetching } = state;
  return [data, error, isFetching, fetch];
}
