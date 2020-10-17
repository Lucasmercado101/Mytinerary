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

  return (
    <div className={usersClass}>
      <List>
        <li>
          <Link className={linkCard} to="/users/user123">
            <ListItem component="div" alignItems="flex-start">
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
                primary={<span className={cardTextPrimary}>Maude73</span>}
                secondary={
                  <>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate ullam, quia nihil suscipit odio illum. Adipisci,
                    asperiores facilis, voluptates consectetur vero modi tempora
                    numquam blanditiis fuga deleniti, voluptate facere
                    recusandae?
                  </>
                }
              />
            </ListItem>
          </Link>
        </li>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default Users;
