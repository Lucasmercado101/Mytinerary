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
import { logOut } from "./api";
import { Ctx } from "./Context";
import { useMachine } from "@xstate/react";
import { authMachine } from "./machines/auth.machine";

function App() {
  const [state, send] = useMachine(authMachine, { devTools: true });
  const history = useHistory();
  const ctx = useContext(Ctx)!;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] =
    useState<null | HTMLElement>();

  const [isLoggedOutUserMenuOpen, setIsLoggedOutUserMenuOpen] = useState(false);
  const [loggedOutMenuAnchorEl, setLoggedOutMenuAnchorEl] =
    useState<null | HTMLElement>();

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

  const handleLoggedOutUserMenuClose = () => {
    setIsLoggedOutUserMenuOpen(false);
    setLoggedOutMenuAnchorEl(null);
  };

  const renderUserMenu = (
    <Menu
      anchorEl={loggedOutMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isLoggedOutUserMenuOpen}
      onClose={handleLoggedOutUserMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/login");
          handleLoggedOutUserMenuClose();
        }}
      >
        Log In
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push("/register");
          handleLoggedOutUserMenuClose();
        }}
      >
        Register Account
      </MenuItem>
    </Menu>
  );

  const renderLoggedInUserMenu = (
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
      open={isUserMenuOpen && ctx.userData !== undefined}
      onClose={handleUserMenuClose}
    >
      <MenuItem
        onClick={() =>
          logOut().then(() => {
            ctx.setUserData();
            localStorage.removeItem("user");
          })
        }
      >
        Log Out
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
            onClick={(e) => {
              ctx.userData
                ? setUserMenuAnchorEl(e.currentTarget)
                : setLoggedOutMenuAnchorEl(e.currentTarget);
              ctx.userData
                ? setIsUserMenuOpen(true)
                : setIsLoggedOutUserMenuOpen(true);
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
      {renderMenu}
      {renderLoggedInUserMenu}
      {renderUserMenu}
    </ThemeProvider>
  );
}

export default App;
