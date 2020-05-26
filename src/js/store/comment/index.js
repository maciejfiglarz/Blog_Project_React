import commentConstants from "./constants";

let initialState = {
  mainComments: [],
  responseComments: [],
  isLoading: false,
};

const createComment = (state, action) => {
  const { payload } = action;
  return {
    ...state,
    mainComments: [payload, ...state.comments],
  };
};

const loadComments = (state, action) => {
  const { payload } = action;
  const { newMainComments, newResponseComments, page } = payload;

  let newState = Object.assign({}, state);
  const { mainComments, responseComments } = newState;

  if (page > 0) {
    return {
      ...newState,
      mainComments: [...mainComments, ...newMainComments],
      responseComments: [...responseComments, ...newResponseComments],
    };
  }
  return {
    ...newState,
    mainComments: newMainComments,
    responseComments: newResponseComments,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case commentConstants.CREATE_COMMENT:
      return createComment(state, action);
    case commentConstants.COMMENTS_LOADED:
      return loadComments(state, action);
  }
  return state;
};
