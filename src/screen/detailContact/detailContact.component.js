import React from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import Service from '../../service'
import Routes from '../../navigation/routes'
import Header from '../../component/header'
import Loading from '../../component/loading'
import Loader from '../../component/loader'
import { emptyImage, defaultProfilePic } from '../../constant/image'
import { setLoadingListContacts } from '../../redux/action/listContactsActions'

import styles from './detailContact.component.styles'

export const getContactHandler = async state => {
  try {
    const response = await Service.get(`contact/${state.id}`)
    const data = _.get(response, 'data.data', {})
    state.setContact(data)
    state.setLoading(false)
  } catch (error) {
    state.setContact({})
    state.setLoading(false)
  }
}

export const navigateToCreateContact = state => () => {
  state.navigation.navigate(Routes.CreateContact)
}

export const deleteHandler = state => async () => {
  state.setLoader(true)
  try {
    await Service.delete(`contact/${state.id}`)
  } finally {
    state.dispatch(setLoadingListContacts(true))
    state.setLoader(false)
    state.navigation.goBack()
  }
}

export const deleteConfirmation = state => () =>
  Alert.alert(
    'Delete Confirmation',
    'Are you sure want to delete this contact?',
    [
      {
        text: 'OK',
        onPress: deleteHandler(state)
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      }
    ]
  )

const renderImage = contact => (
  <Image
    accessibilityLabel="ImageDetailContact"
    source={{
      uri: contact.photo === emptyImage ? defaultProfilePic : contact.photo
    }}
    style={styles.image}
    resizeMode="cover"
  />
)

const renderName = contact => (
  <View accessibilityLabel="NameDetailContact" style={styles.content}>
    <Text accessibilityLabel="TitleNameDetailContact" style={styles.title}>
      Name
    </Text>
    <Text accessibilityLabel="TextNameDetailContact" style={styles.subtitle}>
      {contact.firstName} {contact.lastName}
    </Text>
  </View>
)

const renderAge = contact => (
  <View accessibilityLabel="AgetDetailContact" style={styles.content}>
    <Text accessibilityLabel="TitleAgeDetailContact" style={styles.title}>
      Age
    </Text>
    <Text accessibilityLabel="TextAgeDetailContact" style={styles.subtitle}>
      {contact.age}
    </Text>
  </View>
)

const renderContainer = ({ contact }) => (
  <ScrollView accessibilityLabel="ContainerDetailContact">
    {renderImage(contact)}
    {renderName(contact)}
    {renderAge(contact)}
  </ScrollView>
)

const renderHeader = state => (
  <Header
    showBackButton
    title="Detail Contact"
    right={[
      {
        icon: 'pencil-outline',
        action: navigateToCreateContact(state)
      },
      {
        icon: 'delete-outline',
        action: deleteConfirmation(state)
      }
    ]}
  />
)

export const onCloseLoaderHandler = state => () => {
  state.setLoader(false)
}

const renderLoader = state => (
  <Loader visible={state.loader} onClose={onCloseLoaderHandler(state)} />
)

const useDetailContact = props => {
  const id = _.get(props, 'route.params.id', '')
  const [loading, setLoading] = React.useState(true)
  const [contact, setContact] = React.useState({})
  const navigation = useNavigation()
  const [loader, setLoader] = React.useState(false)
  const dispatch = useDispatch()

  const state = {
    id,
    loading,
    setLoading,
    contact,
    setContact,
    navigation,
    loader,
    setLoader,
    dispatch
  }

  React.useEffect(() => {
    getContactHandler(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

const DetailContact = props => {
  const state = useDetailContact(props)

  return (
    <View style={styles.container}>
      {renderHeader(state)}
      {state.loading ? <Loading /> : renderContainer(state)}
      {renderLoader(state)}
    </View>
  )
}

export default DetailContact
