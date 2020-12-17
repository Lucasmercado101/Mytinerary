import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getUserPfp } from "./Redux/Actions/user";
import "./Styles/app.css";

import Landing from "./pages/Landing/Landing";
import Nav from "./Components/Navbar/Nav";
import Footer from "./pages/Footer";
import Cities from "./pages/Cities";
import CityItineraries from "./pages/CityItineraries/CityItineraries";
import CreateAccount from "./pages/CreateAccount";
import Users from "./pages/Users";
import UserPage from "./pages/UserPage";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  AppWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    height: "100%"
  },
  content: {
    flexGrow: 1
  }
});

function App() {
  const { AppWrapper, content } = useStyles();
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      if (userData.hasOwnProperty("pfp")) dispatch(getUserPfp(userData.pfp));
    }
  }, [userData, dispatch]);

  return (
    <BrowserRouter>
      <div className={AppWrapper}>
        <Nav />
        <div className={content}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/cities" exact component={Cities} />
            <Route path="/cities/:city" exact component={CityItineraries} />
            <Route path="/createAccount" exact component={CreateAccount} />
            <Route path="/logIn" exact component={LogIn} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/user/:user" exact component={UserPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
