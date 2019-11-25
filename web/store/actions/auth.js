import * as types from '../types'

export const fetchUserIfNeeded = async (dispatch, getState) => {
  if (!getState().auth.user) {
    return dispatch({
      type: types.SET_USER,
      payload: {
        test: "ok"
      }
    })
  }
}
