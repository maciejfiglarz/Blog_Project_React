import { combineReducers } from "redux";
import PostsReducer from "./post";
import PostMenagerReducer from "./post-menager";
import UserReducer from "./user";
// import RegistrationReducer  from "./registration_reducers";
// import AuthenticationReducer  from "./authentication/";
import AlertsReducer from "./alert";

const rootReducer = combineReducers({
  posts: PostsReducer,
  postMenager: PostMenagerReducer,
  user: UserReducer,
  //   registration: RegistrationReducer,
  //   authentication : AuthenticationReducer,
  alert: AlertsReducer,
});

export default rootReducer;
