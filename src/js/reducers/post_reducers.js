import { postConstants } from "./../constants/post_constants";

export default (state = {}, action) => {
  switch (action.type) {
    case postConstants.FETCH_PAGINATION:
      return action.payload;
 
  }
  return state;
};
