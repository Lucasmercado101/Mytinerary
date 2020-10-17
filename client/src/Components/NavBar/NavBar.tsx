import React from "react";
import { AppBar, Toolbar, Button, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles(({ breakpoints }) => ({
  buttons: {
    marginLeft: "auto",
    width: "auto"
  },
  link: {
    color: "white"
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
  const { buttons, bar, link } = useStyles();

  return (
    <AppBar className={bar} position="fixed">
      <Toolbar>
        <MenuDrawer />
        <Grid className={buttons} container spacing={2}>
          <Grid item>
            <Link className={link} to="/login">
              <Button variant="text" color="inherit">
                log in
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link className={link} to="/register">
              <Button color="inherit" variant="outlined">
                sign up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
