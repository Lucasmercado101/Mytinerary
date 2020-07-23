import React from "react";
import "./Styles/app.css";
import Landing from "./Components/Containers/Landing";
import Nav from "./Components/Containers/Nav";
import Footer from "./Components/Containers/Footer";
import Cities from "./Components/Containers/Cities";
import CityItineraries from "./Components/Containers/Itineraries";
import CreateAccount from "./Components/Containers/CreateAccount";
import User from "./Components/Containers/User";
import LogIn from "./Components/Containers/LogIn";
import NotFound from "./Components/Containers/NotFound";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
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
          <Route path="/users/user/:user" exact component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Route path="/" component={Footer} />
    </BrowserRouter>
  );
}

export default App;
