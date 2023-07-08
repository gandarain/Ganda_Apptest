import React from 'react'
import { View, FlatList } from 'react-native'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'

import Service from '../../service'
import Header from '../../component/header'
import Loading from '../../component/loading'
import Routes from '../../navigation/routes'

import Contact from './contact'
import styles from './listContact.component.styles'

export const getContactsHandler = async state => {
  try {
    const response = await Service.get('contact')
    const data = _.get(response, 'data.data', [])
    state.setContacts(data)
    state.setLoading(false)
  } catch (error) {
    state.setContacts([])
    state.setLoading(false)
  }
}

export const navigateToContactDetail = state => () => {
  state.navigation.navigate(Routes.DetailContact)
}

export const onRefreshHandler = state => () => {
  state.setLoading(true)
  state.setContacts([])
  getContactsHandler(state)
}

export const renderItem =
  () =>
  ({ item }) =>
    <Contact item={item} />

const renderListContacts = state => (
  <FlatList
    accessibilityLabel="ListContacts"
    refreshing={state.loading}
    data={state.contacts}
    renderItem={renderItem()}
    onRefresh={onRefreshHandler(state)}
  />
)

const useListContact = () => {
  const [contacts, setContacts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const navigation = useNavigation()

  const state = {
    contacts,
    setContacts,
    loading,
    setLoading,
    navigation
  }

  React.useEffect(() => {
    getContactsHandler(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

const ListContact = () => {
  const state = useListContact()

  return (
    <View style={styles.container}>
      <Header
        title="List Contact"
        right={[
          {
            icon: 'plus',
            action: navigateToContactDetail(state)
          }
        ]}
      />
      {state.loading ? <Loading /> : renderListContacts(state)}
    </View>
  )
}

export default ListContact
