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
    height: "75px",
    width: "75px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "50%"
  },
  cardItem: {
    maxHeight: "140px"
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
  const {
    image,
    cardTextPrimary,
    cardItem,
    cardTextSecondary,
    linkCard,
    usersClass
  } = useStyles();

  return (
    <div className={usersClass}>
      <List>
        <Link className={linkCard} to="/users/user123">
          <ListItem className={cardItem} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                className={image}
                src="https://source.unsplash.com/random?face,human"
                alt="person"
              />
            </ListItemAvatar>
            <ListItemText
              style={{ display: "inline-block", marginLeft: 25 }}
              className={cardTextSecondary}
              //Username 18 chars
              primary={<span className={cardTextPrimary}>Maude73</span>}
              secondary={
                <>
                  Nihil vitae repellendus velit veritatis. Quia doloremque
                  nesciunt unde laborum ipsam. Est tenetur sit repudiandae modi.
                </>
              }
            />
          </ListItem>
        </Link>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
};

export default Users;
