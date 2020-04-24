import postMenagerConstants from "./constants";

let initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postMenagerConstants.CHECKING_DATA:
      return { ...state, isLoading: action.isLoading };
  }
  return state;
};
