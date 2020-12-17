import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import UserMenu from "./UserMenu";
import HamburgerMenu from "./HamburgerMenu";

const useStyles = makeStyles({
  bar: {
    padding: "5px 0",
    position: "sticky"
  },
  toolBarStyles: {
    display: "flex",
    justifyContent: "space-between"
  }
});
// TODO: fix the warning of passing functional components and ref
const Nav: React.FC = () => {
  const { bar, toolBarStyles } = useStyles();
  return (
    <AppBar className={bar}>
      <Toolbar className={toolBarStyles}>
        <UserMenu />
        <HamburgerMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
