import React from "react";
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles(({ breakpoints }) => ({
  pfpButton: {
    marginLeft: "auto"
  },
  bar: {
    [breakpoints.up("xs")]: {
      minHeight: 56,
      maxHeight: 56
    },
    [breakpoints.up("sm")]: {
      minHeight: 64,
      maxHeight: 64
    }
  }
}));

const NavBar: React.FC = () => {
  const { pfpButton, bar } = useStyles();
  return (
    <AppBar className={bar} position="fixed">
      <Toolbar>
        <MenuDrawer />
        <Button className={pfpButton} color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
