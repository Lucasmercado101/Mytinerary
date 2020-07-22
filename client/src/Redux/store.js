import { createStore, combineReducers, applyMiddleware } from "redux";
import citiesReducer from "./Reducers/citiesReducer";
import fromReducer from "./Reducers/fromReducer";
import itinerariesReducer from "./Reducers/itinerariesReducer";
import userReducer from "./Reducers/userReducer";
import reduxThunk from "redux-thunk";

const reducers = combineReducers({
  cities: citiesReducer,
  goBack: fromReducer,
  itineraries: itinerariesReducer,
  user: userReducer,
});

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default store;
