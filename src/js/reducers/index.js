import { combineReducers } from "redux";
import  PostsReducer  from "./posts_reducers";
import UserReducer from './user_reducers';
import RegistrationReducer  from "./registration_reducers";
import AuthenticationReducer  from "./authentication_reducers";
import AlertsReducer  from "./alert_reducers";

const rootReducer =  combineReducers({
  posts: PostsReducer,
  user: UserReducer,
  registration: RegistrationReducer,
  authentication : AuthenticationReducer,
  alert:AlertsReducer 
});

export default rootReducer;