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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] =
    useState<null | HTMLElement>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>();

  useEffect(() => {
    ctx.getUserData();
  }, []);

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
    setIsUserMenuOpen(false);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setIsMenuOpen(false);
  };

  const renderLoggedOutUserMenu = (
    <Menu
      anchorEl={userMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isUserMenuOpen}
      onClose={handleUserMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/login");
          handleUserMenuClose();
        }}
      >
        Log In
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/register");
          handleUserMenuClose();
        }}
      >
        Register Account
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
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
          history.push("/cities");
          handleMenuClose();
        }}
      >
        Cities
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/");
          handleMenuClose();
        }}
      >
        Home
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={(e) => {
              setMenuAnchorEl(e.currentTarget);
              setIsMenuOpen(true);
            }}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              setUserMenuAnchorEl(userMenuAnchorEl);
              setIsUserMenuOpen(true);
            }}
            size="medium"
            edge="end"
            color="inherit"
          >
            <Avatar src={ctx?.userData?.profilePic} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cities" component={Cities} />
      <Route exact path="/cities/:id" component={City} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      {renderLoggedOutUserMenu}
      {renderMenu}
    </ThemeProvider>
  );
}

export default App;
