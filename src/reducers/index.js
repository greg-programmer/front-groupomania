//Index.js regroupe tous les reducers//
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";

//récupération de userReducer depuis user.reducer.js
export default combineReducers({
  userReducer,
  postReducer  
})
