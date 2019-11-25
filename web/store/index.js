import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth'

const reducer = combineReducers({
    auth: authReducer,
});

export default (initialState, options) => {
    return createStore(reducer, initialState, applyMiddleware(thunk));
};
