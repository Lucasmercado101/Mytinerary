import { createStore, combineReducers, applyMiddleware } from "redux";
import citiesReducer from "./Reducers/citiesReducer";
import fromReducer from "./Reducers/fromReducer";
import reduxThunk from "redux-thunk";

const reducers = combineReducers({
  cities: citiesReducer,
  goBack: fromReducer,
});

const store = createStore(reducers, applyMiddleware(reduxThunk));

export default store;
