import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/Actions/userActions";
import MyLink from "../MyLink";
import DropDownMenu, { MenuItem } from "../DropDownMenu";
import styles from "../../Styles/navbar.module.css";
import useUserPfp from "../hooks/useUserPfp";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useUserPfp();
  const dispatch = useDispatch();

  return (
    <nav className={styles.navbar}>
      <DropDownMenu
        closeOnClick
        button={
          <img
            className={styles.userMenu__pfp}
            src={userPfp}
            alt={userData.username || "Generic user"}
            title={userData.username || "Generic user"}
          />
        }
      >
        {Object.keys(userData).length > 0 ? (
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
