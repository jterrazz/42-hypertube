import * as types from '../types';

const initialState = {
    user: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return { ...state, user: action.payload };
        case types.CLEAR_USER:
            return { user: null };
        default:
            return state;
    }
};