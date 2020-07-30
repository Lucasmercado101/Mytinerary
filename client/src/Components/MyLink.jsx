import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLastPageVisited } from "../Redux/Actions/getLastPageVisited";

function MyLink(props) {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const destination = props.to || "";

  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
    if (location !== destination) {
      dispatch(getLastPageVisited(location));
    }
  }

  return (
    <Link
      className={props.className}
      style={props.style}
      to={destination}
      onClick={handleClick}
    >
      {props.children}
    </Link>
  );
}

export default MyLink;
