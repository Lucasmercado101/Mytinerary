import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import fromReducer from "./Reducers/fromReducer";
import itinerariesReducer from "./Reducers/itinerariesReducer";
import userReducer from "./Reducers/userReducer";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
  goBack: fromReducer,
  itineraries: itinerariesReducer,
  user: userReducer,
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
