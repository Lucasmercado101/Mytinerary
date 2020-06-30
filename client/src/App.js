import React from "react";
import "./Styles/app.css";
import "./Vendors/normalize.css";
import Landing from "./Components/Landing";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Cities from "./Components/Cities";
import City from "./Components/City";
import NotFound from "./Components/NotFound";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Nav} />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/cities" exact component={Cities} />
          <Route path="/cities/:city" exact component={City} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Route path="/" component={Footer} />
    </BrowserRouter>
  );
}

export default App;
