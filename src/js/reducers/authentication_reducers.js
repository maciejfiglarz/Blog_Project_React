import { userConstants } from "./../constants/user_constants";
import voteService from "./../services/vote_service";

// const dispatch = useDispatch();
// const data = useSelector(store => store)

console.log("userinit", localStorage.getItem("user"));

// const setInitialState = (user) => (dispatch)=> {
//   const preparedPostVotes =  voteService.prepareVotesForUser(user.id);
//   dispatch(votesFetched(preparedPostVotes));
//   // return { loggedIn: true, user: user, postVotes: preparedPostVotes };
// };

// const votesFetched = (votes) => ({
//   type: "FETCH_VOTES_SUCCESS",
//   votes,
// });

let userLocal = localStorage.getItem("user");
let initialState = { loggedIn: false, user: {}, votedPost: {} };

if (userLocal) {
  let userJson = JSON.parse(userLocal);
  // setInitialState(userJson); // promise!
  initialState = { loggedIn: true, user: userJson };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.FETCH_USER_VOTES_SUCCESS:
      return {
        loggingIn: true,
        user: action.user,
        votes: action.payload
      };
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: {} };
    case userConstants.LOGIN_LOGOUT:
      return {
        loggingIn: false,
        user: {},
      };
    default:
      return state;
  }
};
