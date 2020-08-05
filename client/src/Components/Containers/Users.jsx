import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getUsers, getPfp } from "../../api";
import User from "../UserCard";
import SearchBar from "../SearchBar";
import LoadingRing from "../LoadingRing";

function Users() {
  const [users, , isFetching, fetchUsers] = useFetch(getUsers, []);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    document.title = "Users";
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      //TODO do a filter and only geta new array of ones with pfp
      //* then get the pfp and set filtered users to a ...users + newusers pfp
      setFilteredUsers(users);
    }
  }, [users]);

  // useEffect(() => {
  //   setFilteredUsers(users);
  // }, [users]);

  return (
    <>
      <h1
        style={{
          color: "black",
          width: "100%",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "15px",
          marginBottom: "0",
        }}
      >
        USERS
      </h1>
      <SearchBar
        label={"Search users:"}
        data={users}
        filter={"username"}
        setFilteredResults={setFilteredUsers}
      />

      {isFetching ? (
        <LoadingRing centered />
      ) : (
        filteredUsers.map((user, i) => <User key={i} userData={user} />)
      )}
    </>
  );
}

export default Users;
