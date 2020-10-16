import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  listItem: {
    color: "black",
    textDecoration: "none",
    minWidth: "112px"
  }
}));

const MenuDrawer: React.FC = () => {
  const { listItem } = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={listItem} to="/">
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={listItem} to="/cities">
            Cities
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={listItem} to="/users">
            Users
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuDrawer;
