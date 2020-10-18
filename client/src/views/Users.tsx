import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../api";

type User = {
  _id: string;
  username: string;
  profileText: string;
  firstname: string;
  lastname: string;
  country: string;
};

const useStyles = makeStyles(() => ({
  usersClass: {
    padding: 5
  },
  image: {
    height: "50px",
    width: "50px"
  },

  cardTextPrimary: {
    whiteSpace: "nowrap",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cardTextSecondary: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  linkCard: {
    textDecoration: "none"
  }
}));

const Users = () => {
  const { image, cardTextPrimary, linkCard, usersClass } = useStyles();
  const { data, isLoading, error } = useQuery<User[]>("users", getUsers);

  return (
    <div className={usersClass}>
      <List>
        {data &&
          data.map((userData) => {
            return (
              <>
                <li>
                  <Link className={linkCard} to={`/users/${userData._id}`}>
                    <ListItem component="div" alignItems="flex-start">
                      {/* TODO: add user image upload */}
                      <ListItemAvatar>
                        <Avatar
                          className={image}
                          src="https://source.unsplash.com/random?face,human"
                          alt="person"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: 25
                        }}
                        //Username 18 chars
                        primary={
                          <span className={cardTextPrimary}>
                            {userData.username}
                          </span>
                        }
                        secondary={<>{userData.profileText}</>}
                      />
                    </ListItem>
                  </Link>
                </li>
                <Divider variant="inset" component="li" />
              </>
            );
          })}
      </List>
    </div>
  );
};

export default Users;
