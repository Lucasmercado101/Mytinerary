import { createStore, combineReducers, applyMiddleware } from "redux";
// import { compose } from "redux";
import lastPage from "./Reducers/lastPage";
import user from "./Reducers/user";
import addingPfp from "./Reducers/addingPfp";
import changePfp from "./Reducers/changePfp";
import createUser from "./Reducers/createUser";
import reduxThunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  goBack: lastPage,
  creatingAccount: createUser,
  user,
  addingPfp,
  changingPfp: changePfp,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
  // composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
