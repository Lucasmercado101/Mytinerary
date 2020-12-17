import React, { useState } from "react";
import MyLink from "../MyLink";
import { logOut } from "../../Redux/Actions/user";
import { useSelector, useDispatch } from "react-redux";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import styles from "../../Styles/navbar.module.css";
import MenuItem from "@material-ui/core/MenuItem";
import genericPfp from "../../Images/generic-user.svg";
import addUser from "../../Images/add-user.svg";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: GlobalState) => state.user.userData as PersonalUserData
  );
  const userPfp = useSelector((state: GlobalState) => state.user.userPfp);
  const userIsLoggedIn = Object.keys(userData).length > 0;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <img
          className={styles.userMenu__pfp}
          src={userIsLoggedIn ? userPfp || genericPfp : addUser}
          alt={userData.username || "Generic user"}
          title={userData.username || "Generic user"}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userIsLoggedIn
          ? [
              <MenuItem
                key={1}
                component={MyLink}
                to={"/users/user/" + userData._id}
              >
                My profile
              </MenuItem>,
              <MenuItem
                key={2}
                onClick={() => {
                  handleClose();
                  dispatch(logOut());
                }}
              >
                Logout
              </MenuItem>
            ]
          : [
              <MenuItem
                key={3}
                component={MyLink}
                to="/createAccount"
                onClick={handleClose}
              >
                Create account
              </MenuItem>,
              <MenuItem
                key={4}
                component={MyLink}
                to="/logIn"
                onClick={handleClose}
              >
                Log in
              </MenuItem>
            ]}
      </Menu>
    </>
  );
};

export default UserMenu;
