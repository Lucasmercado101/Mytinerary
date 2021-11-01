import { useContext, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";
import City from "./pages/City";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThemeProvider from "./Theme";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from "@mui/material";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useQuery } from "react-query";
import { isLoggedIn as isLoggedInQuery } from "./api";
import { Ctx } from "./Context";

function App() {
  const history = useHistory();
  const ctx = useContext(Ctx)!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    ctx.getUserData();
  }, [ctx]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const renderLoggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/login");
          handleMenuClose();
        }}
      >
        Log In
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/register");
          handleMenuClose();
        }}
      >
        Register Account
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => setIsMenuOpen(true)}
            size="medium"
            edge="end"
            color="inherit"
          >
            <Avatar src={ctx?.userData?.profile_pic} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cities" component={Cities} />
      <Route exact path="/cities/:id" component={City} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {renderLoggedOutMenu}
    </ThemeProvider>
  );
}

export default App;
