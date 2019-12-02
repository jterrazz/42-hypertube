import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth'

/*
 * Learn more about redux, state, reducers and actions
 * https://redux.js.org/introduction/getting-started
 */

const reducer = combineReducers({
  auth: authReducer,
});

export default (initialState, options) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
};
