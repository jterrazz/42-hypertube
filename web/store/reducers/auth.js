import * as types from '../types';

const initialState = {
  user: null,
  needToCompleteProfile: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {...state, user: action.payload, needToCompleteProfile: false};
    case types.SET_INCOMPLETE_USER:
      return {...state, needToCompleteProfile: true};
    case types.CLEAR_USER:
      return {...state, user: null, needToCompleteProfile: false};
    default:
      return state;
  }
};
