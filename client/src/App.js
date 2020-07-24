import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getLoggedInUserData } from "./Redux/Actions/getLoggedInUserData";
import "./Styles/app.css";

// Containers / Pages
import Landing from "./Components/Containers/Landing";
import Nav from "./Components/Containers/Nav";
import Footer from "./Components/Containers/Footer";
import Cities from "./Components/Containers/Cities";
import CityItineraries from "./Components/Containers/Itineraries";
import CreateAccount from "./Components/Containers/CreateAccount";
import Users from "./Components/Containers/Users";
import User from "./Components/Containers/user/Index";
import LogIn from "./Components/Containers/LogIn";
import NotFound from "./Components/Containers/NotFound";

function App() {
  const loggedInUser = useSelector((state) => state.user.currentlyLoggedInUser);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser && Object.keys(userData).length === 0) {
      dispatch(getLoggedInUserData(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <BrowserRouter>
      <Route path="/" component={Nav} />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/cities" exact component={Cities} />
          <Route path="/cities/:city" exact component={CityItineraries} />
          <Route path="/createAccount" exact component={CreateAccount} />
          <Route path="/logIn" exact component={LogIn} />
          <Route path="/users" exact component={Users} />
          <Route path="/users/user/:user" exact component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Route path="/" component={Footer} />
    </BrowserRouter>
  );
}

export default App;
