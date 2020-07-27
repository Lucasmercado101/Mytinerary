import React, { useEffect, useState } from "react";
import axios from "axios";
import User from "../UserCard";
import SearchBar from "../SearchBar";
import LoadingRing from "../LoadingRing";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      axios
        .get("http://localhost:5000/api/users")
        .then((resp) => {
          setUsers(resp.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    })();
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
        filteredUsers.map((user, i) => <User key={i} user={user} />)
      )}
    </>
  );
}

export default Users;
