import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Redux/Actions/user";
import MyLink from "../MyLink";
// import DropDownMenu, { MenuItem } from "../DropDownMenu";
import styles from "../../Styles/navbar.module.css";
import genericPfp from "../../Images/generic-user.svg";
import addUser from "../../Images/add-user.svg";

function Nav() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const dispatch = useDispatch();
  const userIsLoggedIn = Object.keys(userData).length > 0;

  return (
    <nav className={styles.navbar}>
      {/* <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      News
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar> */}
      {/* <DropDownMenu
        closeOnClick
        button={
          <img
            className={styles.userMenu__pfp}
            src={userIsLoggedIn ? userPfp || genericPfp : addUser}
            alt={userData.username || "Generic user"}
            title={userData.username || "Generic user"}
          />
        }
      >
        {userIsLoggedIn ? (
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
      </DropDownMenu> */}
    </nav>
  );
}

export default Nav;
