import React from "react";
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { getUserPfp } from "./Redux/Actions/user";
import { makeStyles } from "@material-ui/core";

import Landing from "./views/Landing";
import NavBar from "./Components/NavBar/NavBar";
// import Footer from "./Components/Containers/Footer";
// import Cities from "./Components/Containers/Cities";
import Cities from "./views/Cities/Cities";
import CityItineraries from "./views/CityItineraries";
import Register from "./views/Register";
import LogIn from "./views/LogIn";
import Users from "./views/Users";
// import CreateAccount from "./Components/Containers/CreateAccount";
// import UserPage from "./Components/Containers/UserPage";
// import LogIn from "./Components/Containers/LogIn";
// import NotFound from "./Components/Containers/NotFound";

const useStyles = makeStyles(({ breakpoints }) => ({
  content: {
    width: "100%",
    overflow: "auto",
    [breakpoints.up("xs")]: {
      marginTop: 56,
      height: "calc(100% - 56px)"
    },
    [breakpoints.up("sm")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  }
}));

function App() {
  const { content } = useStyles();

  // const userData = useSelector((state) => state.user.userData);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (Object.keys(userData).length > 0) {
  //     if (userData.hasOwnProperty("pfp")) dispatch(getUserPfp(userData.pfp));
  //   }
  // }, [userData, dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <div className={content}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/cities" exact component={Cities} />
          <Route
            path="/cities/city/:cityId"
            exact
            component={CityItineraries}
          />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/users" exact component={Users} />

          {/* <Route path="/createAccount" exact component={CreateAccount} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/user/:user" exact component={UserPage} />
          <Route component={NotFound} /> */}
        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
