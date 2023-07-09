import { SET_LOADING_LIST_CONTACTS } from '../types'

const initialState = {
  loading: false
}

const listContactsReducer = (state, action) => {
  const setState = state || initialState
  switch (action.type) {
    case SET_LOADING_LIST_CONTACTS:
      return {
        ...setState,
        loading: action.payload
      }

    default:
      return setState
  }
}

export default listContactsReducer
