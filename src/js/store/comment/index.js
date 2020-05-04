import commentConstants from "./constants";

let initialState = {
  data: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case commentConstants.CREATE_COMMENT:
      return state;
    case commentConstants.COMMENTS_LOADED:
      // return { ...state, data:{}...action.payload };
      return state;
  }
  return state;
};
