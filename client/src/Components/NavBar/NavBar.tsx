import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Grid,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
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
  const theme = useTheme();
  const tabletAndBigger = useMediaQuery(theme.breakpoints.up("sm"));
  const { buttons, bar, link } = useStyles();

  return (
    <AppBar className={bar} position="fixed">
      <Toolbar>
        {tabletAndBigger ? (
          <Grid container style={{ width: "auto" }} spacing={2}>
            <Grid item>
              <Link className={link} to="/">
                <Button variant="text" color="inherit">
                  home
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className={link} to="/cities">
                <Button variant="text" color="inherit">
                  cities
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className={link} to="/users">
                <Button variant="text" color="inherit">
                  users
                </Button>
              </Link>
            </Grid>
          </Grid>
        ) : (
          <MenuDrawer />
        )}
        <Grid className={buttons} container direction="row" spacing={2}>
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
