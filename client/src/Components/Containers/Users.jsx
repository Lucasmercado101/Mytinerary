import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { getUsers } from "../../api";
import User from "../UserCard";
import SearchBar from "../SearchBar";
import LoadingRing from "../LoadingRing";

function Users() {
  const [users, , isFetching] = useFetch(getUsers, [], true);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [thereAreUsers, setThereAreUsers] = useState(true);

  useEffect(() => {
    document.title = "Users";
  }, []);

  useEffect(() => {
    users.length > 0 && setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (!isFetching && users.length === 0) {
      setThereAreUsers(false);
    }
  }, [isFetching, users]);

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

      {thereAreUsers ? (
        <>
          <SearchBar
            label={"Search users:"}
            data={users}
            filter={"username"}
            setFilteredResults={setFilteredUsers}
          />

          {(isFetching && <LoadingRing centered />) ||
            filteredUsers.map((user, i) => <User key={i} userData={user} />)}
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>There are no users</h2>
      )}
    </>
  );
}

export default Users;
