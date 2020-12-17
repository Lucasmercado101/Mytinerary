import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api";
import User from "../Components/UserCard";
import SearchBar from "../Components/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loadingStyle: {
    display: "block",
    margin: "auto"
  },
  title: {
    color: "black",
    width: "100%",
    fontWeight: 300,
    textAlign: "center",
    marginTop: "15px",
    marginBottom: "0"
  }
});

const Users: React.FC = () => {
  const { loadingStyle, title } = useStyles();
  const { data: users = [], isLoading } = useQuery("users", getUsers);
  const thereAreUsers = users.length > 0;
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    document.title = "Users";
  }, []);

  useEffect(() => {
    users && users.length > 0 && setFilteredUsers(users);
  }, [users]);

  return (
    <>
      <h1 className={title}>USERS</h1>

      {isLoading ? (
        <CircularProgress className={loadingStyle} />
      ) : thereAreUsers ? (
        <>
          <SearchBar
            label={"Search users:"}
            data={users}
            filter={"username"}
            setFilteredResults={setFilteredUsers}
          />
          {filteredUsers.map((user: PublicUserData) => (
            <User key={user._id} userData={user} />
          ))}
        </>
      ) : (
        <h2 style={{ textAlign: "center" }}>There are no users</h2>
      )}
    </>
  );
};

export default Users;
