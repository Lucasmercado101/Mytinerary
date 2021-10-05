import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/cities" component={Cities} />
    </div>
  );
}

export default App;
