import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/Actions/logOut";
import MyLink from "../MyLink";
import DropdownMenu, { ListItem } from "../DropdownMenu";
import styles from "../../Styles/navbar.module.css";
import addUser from "../../Images/add-user.svg";
import useUserPfp from "../hooks/useUserPfp";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useUserPfp();

  const isThereUserData = Object.keys(userData).length !== 0;
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <DropdownMenu
        card
        className={styles.userMenu}
        button={
          <img
            className={styles.userMenu__pfp}
            src={userPfp || addUser}
            alt="Profile picture"
          />
        }
      >
        {isThereUserData ? (
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
        {isThereUserData ? "" : <MyLink to="/logIn">Log in</MyLink>}
        {/* fix this ugly 2 tertiary, it should be only one */}
      </DropdownMenu>

      <DropdownMenu align="right" nav card>
        <MyLink to="/cities">Cities</MyLink>
        <MyLink to="/">Home</MyLink>
      </DropdownMenu>
    </nav>
  );
}

export default Nav;
