import * as types from '../types'

export const fetchUserIfNeeded = matchaClient => async (dispatch, getState) => {
  if (!getState().auth.user) {
    return matchaClient.getMe()
      .then(me => {
        return dispatch({
          type: types.SET_USER,
          payload: me
        })
      })
      .catch(_ => {
        // TODO + Router push to login
        return dispatch({
          type: types.CLEAR_USER
        })
      })
  }
}
