import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../Redux/Actions/logOut";
import MyLink from "./MyLink";
import DropdownMenu, { ListItem } from "./DropdownMenu";
import styles from "../Styles/navbar.module.css";
import addUser from "../Images/add-user.svg";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = userData.pfp
    ? `data:image/${userData.pfp.type.split(".")[1]};base64,${Buffer.from(
        userData.pfp.data
      ).toString("base64")}`
    : "";

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
        {/* an empty object ({}) is TRUTHY, so i can't do userData ? X : Y */}
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
