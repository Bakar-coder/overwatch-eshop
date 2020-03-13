import {SET_CURRENT, REMOVE_CURRENT, RESET_TOKEN} from '../types';
import cookie from 'js-cookie';

const authState = {
  user: null,
  isAuth: false,
  resetToken: null
};

export default (state = authState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT:
      return {
        ...state,
        user: payload,
        isAuth: true
      };
    case REMOVE_CURRENT:
      cookie.remove('x-auth-token');
      return {
        ...state,
        user: null,
        isAuth: false
      };
    case RESET_TOKEN:
      return {
        ...state,
        resetToken: payload
      }
    default:
      return state;
  }
};
