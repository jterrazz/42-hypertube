import * as types from '../types'
import matchaAPI from "../../services/matcha-api";
import { i18n } from '../../utils/i18n'

export const login = ({ username, password }) => async dispatch => {
  const me = await matchaAPI.signin(username, password)

  return await dispatch(setUser(me))
}

export const register = (userData) => async dispatch => {
  const me = await matchaAPI.signup(userData)

  return await dispatch(setUser(me))
}

export const logout = async dispatch => {
  await matchaAPI.signout()
  return dispatch({
    type: types.CLEAR_USER
  })
}

export const setUser = user => async dispatch => {
  await i18n.changeLanguage(user.language);
  return dispatch({
    type: types.SET_USER,
    payload: user
  })
}

export const patchUser = user => async dispatch => {
  const newUser = await matchaAPI.patchMe(user)
  return dispatch(setUser(newUser))
}

export const fetchUserIfNeeded = (matchaClient, force = false) => async (dispatch, getState) => {
  if (!getState().auth.requested || force) {
    dispatch({
      type: types.SET_REQUESTED
    })
    return matchaClient.getMe()
      .then(me => dispatch(setUser(me)))
      .catch(error => {
        if (error.response && error.response.status === 422) {
          return dispatch({
            type: types.SET_INCOMPLETE_USER
          })
        }

        dispatch({
          type: types.CLEAR_USER
        })
        throw error
      })
  }
}
