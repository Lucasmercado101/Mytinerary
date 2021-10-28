import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";
import City from "./pages/City";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cities" component={Cities} />
      <Route exact path="/cities/:id" component={City} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
