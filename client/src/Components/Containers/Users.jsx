import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
// import { getUsers, getPfp } from "../../api";
import { getUsers } from "../../api";
import User from "../UserCard";
import SearchBar from "../SearchBar";
import LoadingRing from "../LoadingRing";

function Users() {
  const [users, , isFetching] = useFetch(getUsers, [], true);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    document.title = "Users";
  }, []);

  useEffect(() => {
    users.length > 0 && setFilteredUsers(users);
  }, [users]);

  //TODO Usercard, re renders every time onChange of searchbar
  //! which causes it to re-fetch userPfp ,
  //TODO make it a Presentational component, fetch all
  //TODO pfps here, only once, when all data is fetched

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

      {(isFetching && <LoadingRing centered />) ||
        filteredUsers.map((user, i) => <User key={i} userData={user} />)}
    </>
  );
}

export default Users;
