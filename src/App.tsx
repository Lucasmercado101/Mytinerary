import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";
import City from "./pages/City";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThemeProvider from "./Theme";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from ".pnpm/@mui+system@5.0.6_0c6b44af47723f3fbfad0689dde655a8/node_modules/@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  return (
    <ThemeProvider>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" edge="end" color="inherit">
            <Avatar />
          </IconButton>
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
