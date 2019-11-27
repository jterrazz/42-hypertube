import * as types from '../types'
import matchaAPI from "../../services/matcha-api";
import { i18n } from '../../utils/i18n'

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

export const setUser = user => async dispatch => {
  await i18n.changeLanguage('us');
  // await i18n.changeLanguage(user.language);
  return dispatch({
    type: types.SET_USER,
    payload: user
  })
}

export const patchUser = user => async dispatch => {
  await matchaAPI.patchMe(user)
  return dispatch(setUser(user))// TODO Try with ,user
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

        return dispatch({
          type: types.CLEAR_USER
        })
      })
  }
}
