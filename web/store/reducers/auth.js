import * as types from '../types';

const initialState = {
  user: null,
  needToCompleteProfile: false,
  requested: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      const user = {
        ...state.user,
        ...action.payload
      }
      return {...state, user, needToCompleteProfile: false};
    case types.SET_INCOMPLETE_USER:
      return {...state, needToCompleteProfile: true};
    case types.CLEAR_USER:
      return {...state, user: null, needToCompleteProfile: false};
    case types.SET_REQUESTED:
      return {...state, requested: true};
    default:
      return state;
  }
};
