import { SET_ALERT, REMOVE_ALERT } from '../types';

const errState = {
  alert: null
};

export default (state = errState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      console.log(payload);
      return {
        ...state,
        alert: payload
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null
      };
    default:
      return state;
  }
};
