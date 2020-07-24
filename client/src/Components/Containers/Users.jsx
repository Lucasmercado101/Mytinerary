import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/Actions/getUsers";
import User from "../UserCard";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {users.map((user) => (
        <User user={user} />
      ))}
    </>
  );
}

export default Users;
