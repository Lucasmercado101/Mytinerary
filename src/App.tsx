import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";
import City from "./pages/City";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThemeProvider from "./Theme";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <AppBar position="sticky">
        <Toolbar>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cities" component={Cities} />
      <Route exact path="/cities/:id" component={City} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </ThemeProvider>
  );
}

export default App;
