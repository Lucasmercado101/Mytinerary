import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/Actions/logOut";
import MyLink from "../MyLink";
import DropDownMenu, { MenuItem } from "../DropDownMenu";
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
      <DropDownMenu
        closeOnClick
        button={
          <img
            className={styles.userMenu__pfp}
            src={loggedInUser ? (userPfp ? userPfp : genericPfp) : addUser}
            alt={userData.userName || "Generic user"}
          />
        }
      >
        {loggedInUser ? (
          <>
            <MyLink to={"/users/user/" + userData._id}>My profile</MyLink>
            <MenuItem
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Log out
            </MenuItem>
          </>
        ) : (
          <>
            <MyLink to="/createAccount">Create account</MyLink>
            <MyLink to="/logIn">Log in</MyLink>
          </>
        )}
      </DropDownMenu>

      <DropDownMenu closeOnClick align="right">
        <MyLink to="/cities">Cities</MyLink>
        <MyLink to="/users">Users</MyLink>
        <MyLink to="/">Home</MyLink>
      </DropDownMenu>
    </nav>
  );
}

export default Nav;
