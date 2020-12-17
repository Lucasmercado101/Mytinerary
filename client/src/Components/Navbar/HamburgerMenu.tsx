import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import HamburgerMenuIcon from "@material-ui/icons/Menu";
import MyLink from "../MyLink";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  hamburgerStyle: {
    color: "white",
    fontSize: "3rem"
  }
});

const HamburgerMenu: React.FC = () => {
  const { hamburgerStyle } = useStyles();
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
        <HamburgerMenuIcon className={hamburgerStyle} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem
          onClick={handleClose}
          style={{ minWidth: 100 }}
          component={MyLink}
          to="/cities"
        >
          Cities
        </MenuItem>
        <MenuItem onClick={handleClose} component={MyLink} to="/users">
          Users
        </MenuItem>
        <MenuItem onClick={handleClose} component={MyLink} to="/">
          Home
        </MenuItem>
      </Menu>
    </>
  );
};

export default HamburgerMenu;
