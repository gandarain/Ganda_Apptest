import { SET_LOADING_LIST_CONTACTS } from '../types'

export const setLoadingListContacts = payload => {
  return {
    type: SET_LOADING_LIST_CONTACTS,
    payload
  }
}
