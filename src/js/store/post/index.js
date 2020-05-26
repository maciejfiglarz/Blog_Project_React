import postConstants from "./constants";

let initialState = {
  data: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postConstants.POSTS_FETCH_SUCCESS:
      const payload = action.payload;
      let newState = Object.assign({}, state);
      for (const key in payload) {
        newState.data[payload[key]._id] = payload[key];
      }
      return newState;
  }
  return state;
};
