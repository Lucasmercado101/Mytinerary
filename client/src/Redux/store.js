import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import fromReducer from "./Reducers/fromReducer";
import userReducer from "./Reducers/userReducer";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  goBack: fromReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
