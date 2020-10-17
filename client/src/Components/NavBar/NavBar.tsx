import React from "react";
import { AppBar, Toolbar, Button, makeStyles, Grid } from "@material-ui/core";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles(({ breakpoints }) => ({
  buttons: {
    marginLeft: "auto",
    width: "auto"
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
  const { buttons, bar } = useStyles();
  return (
    <AppBar className={bar} position="fixed">
      <Toolbar>
        <MenuDrawer />
        <Grid className={buttons} container spacing={2}>
          <Grid item>
            <Button variant="text" color="inherit">
              log in
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" variant="outlined">
              sign up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
