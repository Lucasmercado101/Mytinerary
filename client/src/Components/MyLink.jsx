import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLastPageVisited } from "../Redux/Actions/getLastPageVisited";

function MyLink(props) {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const destination = props.to || "";

  return (
    <Link
      to={destination}
      onClick={() =>
        location === destination ? "" : dispatch(getLastPageVisited(location))
      }
    >
      {props.children}
    </Link>
  );
}

export default MyLink;
