import { combineReducers } from "redux";
import  PostsReducer  from "./posts_reducers";
import UserReducer from './user_reducers';


const rootReducer =  combineReducers({
  posts: PostsReducer,
  user: UserReducer
});

export default rootReducer;