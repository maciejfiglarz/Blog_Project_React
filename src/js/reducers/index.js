import { combineReducers } from "redux";
import  PostsReducer  from "./posts_reducers";
import UserReducer from './user_reducers';
import RegistrationReducer  from "./registration_reducers";


const rootReducer =  combineReducers({
  posts: PostsReducer,
  user: UserReducer,
  registration: RegistrationReducer 
});

export default rootReducer;