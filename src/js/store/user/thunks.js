import voteService from "../../services/vote_service";
import userConstants from "./constants";

const setInitialData = (user) => {
  return async (dispatch) => {
    const result = await voteService.prepareVotesForUserTest(user);
    console.log("result", result);
    voteService
      .prepareVotesForUser(user)
      .then((result) => {
        const { data } = result;
        dispatch({
          type: userConstants.FETCH_USER_VOTES,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};

const userThunks = {
  setInitialData,
};

export default userThunks;
