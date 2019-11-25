import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth'

const reducer = combineReducers({
    auth: authReducer,
});

export default (initialState, options) => {
    return createStore(reducer, initialState);
};