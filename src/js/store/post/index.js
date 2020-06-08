import postConstants from "./constants";

let initialState = {
  data: {},
  isLoading: false,
};

const loadPosts = (state, action) => {
  const { payload, page } = action;
  let newState = {};
  if (page > 0) {
    newState = Object.assign({}, state);
  } else {
    newState = { data: {}, page };
  }
  for (const key in payload) {
    newState.data[payload[key]._id] = payload[key];
  }

  return newState;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postConstants.POSTS_FETCH_SUCCESS:
      // const payload = action.payload;
      // let newState = Object.assign({}, state);
      // for (const key in payload) {
      //   newState.data[payload[key]._id] = payload[key];
      // }
      // return newState;
      return loadPosts(state, action);
  }
  return state;
};
