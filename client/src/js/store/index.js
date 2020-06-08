import { combineReducers } from "redux";
import PostsReducer from "./post";
import PostMenagerReducer from "./post-menager";
import UserReducer from "./user";
import CommentReducer  from "./comment";
// import AuthenticationReducer  from "./authentication/";
import AlertsReducer from "./alert";

const rootReducer = combineReducers({
  posts: PostsReducer,
  postMenager: PostMenagerReducer,
  user: UserReducer,
  comment: CommentReducer,
  //   authentication : AuthenticationReducer,
  alert: AlertsReducer,
});

export default rootReducer;
