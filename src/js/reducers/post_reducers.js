import { postConstants } from "./../constants/post_constants";

let initialState = {
  data: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postConstants.POSTS_FETCH_SUCCES:
      const payload = action.payload;
      let newState = Object.assign({}, state);
      for (const key in payload) {
        newState.data[payload[key]._id] = payload[key];
      }
  
      // return { data : { ...state.data, ...newState } };
      return newState;
  }
  return state;
};

// store/
//    - index.js //konfiguracja store
//    - user/
//       - index.js //reducer
//       - actions.js
//       - thunks.js //thunki, cały kod asynchroniczny i to tu powinno wylądować
