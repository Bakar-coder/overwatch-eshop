import { SET_ERROR, REMOVE_ERROR } from '../types';

const errState = {
  error: null
};

export default (state = errState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
