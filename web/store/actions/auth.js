import * as types from '../types'
import matchaAPI from "../../services/matcha-api";

export const login = ({ username, password }) => async dispatch => {
  const me = await matchaAPI.signin(username, password)

  return dispatch({
    type: types.SET_USER,
    payload: me
  })
}

export const logout = async dispatch => {
  await matchaAPI.signout()
  return dispatch({
    type: types.CLEAR_USER
  })
}

export const setUser = user => dispatch => {
  // i18next.changeLanguage(response.data.user.language); // TODO
  return dispatch({
    type: types.SET_USER,
    payload: user
  })
}

export const fetchUserIfNeeded = (matchaClient, force = false) => async (dispatch, getState) => {
  if (!getState().auth.user || force) {
    return matchaClient.getMe()
      .then(me => dispatch(setUser(me)))
      .catch(error => {
        if (error.response && error.response.status === 422) {
          return dispatch({
            type: types.SET_INCOMPLETE_USER
          })
        }

        return dispatch({
          type: types.CLEAR_USER
        })
      })
  }
}
