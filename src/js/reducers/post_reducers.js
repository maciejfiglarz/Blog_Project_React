import { postConstants } from "./../constants/post_constants";

export default (state = {}, action) => {
  switch (action.type) {
    case postConstants.POSTS_FETCH_SUCCES:
      const payload = action.payload;
      let newState = Object.assign({}, state);
      for (const key in payload) {
        newState[payload[key]._id] = payload[key];
      }

      return { ...state, ...newState };
  }
  return state;
};

// store/
//    - index.js //konfiguracja store
//    - user/
//       - index.js //reducer
//       - actions.js
//       - thunks.js //thunki, cały kod asynchroniczny i to tu powinno wylądować
