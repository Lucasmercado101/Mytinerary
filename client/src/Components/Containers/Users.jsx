import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../UserCard";
import { getUsers } from "../../api";
import SearchBar from "../SearchBar";
import LoadingRing from "../LoadingRing";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    setIsLoading(true);
    getUsers({ cancelToken: source.token })
      .then((users) => {
        if (isMounted) {
          setUsers(users);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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

      {isLoading ? (
        <LoadingRing centered />
      ) : (
        filteredUsers.map((user, i) => <User key={i} userData={user} />)
      )}
    </>
  );
}

export default Users;
