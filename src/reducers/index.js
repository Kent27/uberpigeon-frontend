import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
// import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import pigeonReducer from "./pigeonReducer";


export default combineReducers({
//   users: userReducer,
  dashboard: dashboardReducer,
  pigeon: pigeonReducer,
  form: formReducer,
});
