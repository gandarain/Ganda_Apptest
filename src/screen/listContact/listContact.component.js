import React from 'react'
import { View, FlatList } from 'react-native'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import Service from '../../service'
import Header from '../../component/header'
import Loading from '../../component/loading'
import Routes from '../../navigation/routes'
import { setLoadingListContacts } from '../../redux/action/listContactsActions'

import Contact from './contact'
import styles from './listContact.component.styles'

export const getContactsHandler = async state => {
  try {
    const response = await Service.get('contact')
    const data = _.get(response, 'data.data', [])
    state.setContacts(data)
    state.setLoading(false)
    state.dispatch(setLoadingListContacts(false))
  } catch (error) {
    state.setContacts([])
    state.setLoading(false)
    state.dispatch(setLoadingListContacts(false))
  }
}

export const navigateToCreateContact = state => () => {
  state.navigation.navigate(Routes.CreateContact)
}

export const onRefreshHandler = state => () => {
  state.setLoading(true)
  state.setContacts([])
  getContactsHandler(state)
}

export const renderItem =
  () =>
  ({ item }) =>
    <Contact item={item} key={item.id} />

const renderListContacts = state => (
  <FlatList
    accessibilityLabel="ListContacts"
    refreshing={state.loading || state.loadingListContacts}
    data={state.contacts}
    renderItem={renderItem()}
    onRefresh={onRefreshHandler(state)}
  />
)

const renderHeader = state => (
  <Header
    title="List Contact"
    right={[
      {
        icon: 'plus',
        action: navigateToCreateContact(state)
      }
    ]}
  />
)

const useListContact = () => {
  const [contacts, setContacts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const loadingListContacts = useSelector(reducer =>
    _.get(reducer, 'listContactsReducer.loading', false)
  )

  const state = {
    contacts,
    setContacts,
    loading,
    setLoading,
    navigation,
    dispatch,
    loadingListContacts
  }

  React.useEffect(() => {
    getContactsHandler(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (loadingListContacts) {
      onRefreshHandler(state)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingListContacts])

  return state
}

const ListContact = () => {
  const state = useListContact()

  return (
    <View style={styles.container}>
      {renderHeader(state)}
      {state.loading || state.loadingListContacts ? (
        <Loading />
      ) : (
        renderListContacts(state)
      )}
    </View>
  )
}

export default ListContact
