import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/Actions/logOut";
import MyLink from "../MyLink";
import DropdownMenu, { ListItem } from "../DropdownMenu";
import styles from "../../Styles/navbar.module.css";
import addUser from "../../Images/add-user.svg";
import useUserPfp from "../hooks/useUserPfp";
import genericPfp from "../../Images/generic-user.svg";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const loggedInUser = useSelector((state) => state.user.currentlyLoggedInUser);
  const userPfp = useUserPfp();

  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <DropdownMenu
        card
        className={styles.userMenu}
        button={
          <img
            className={styles.userMenu__pfp}
            src={loggedInUser ? (userPfp ? userPfp : genericPfp) : addUser}
            alt="Profile picture"
          />
        }
      >
        {loggedInUser ? (
          <ListItem
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Log out
          </ListItem>
        ) : (
          <MyLink to="/createAccount">Create account</MyLink>
        )}
        {loggedInUser ? (
          <MyLink to={"/users/user/" + userData._id}>My profile</MyLink>
        ) : (
          <MyLink to="/logIn">Log in</MyLink>
        )}
        {/* fix this ugly 2 tertiary, it should be only one */}
      </DropdownMenu>

      <DropdownMenu align="right" nav card>
        <MyLink to="/cities">Cities</MyLink>
        <MyLink to="/users">Users</MyLink>
        <MyLink to="/">Home</MyLink>
      </DropdownMenu>
    </nav>
  );
}

export default Nav;
