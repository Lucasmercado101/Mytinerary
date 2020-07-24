import React from "react";
import User from "./User";
import CurrentUser from "./CurrentUser";
import { useSelector } from "react-redux";

function Index(props) {
  const loggedInUser = useSelector((state) => state.user.currentlyLoggedInUser);
  const userID = props.match.params.user;
  return (
    <>{loggedInUser === userID ? <CurrentUser /> : <User userID={userID} />}</>
  );
}

export default Index;
