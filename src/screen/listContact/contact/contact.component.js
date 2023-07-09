import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import { emptyImage, defaultProfilePic } from '../../../constant/image'
import Routes from '../../../navigation/routes'

import styles from './contact.component.styles'

const renderIcon = () => (
  <Icon
    accessibilityLabel="IconDetail"
    name="chevron-right"
    size={styles.icon.size}
    color={styles.icon.color}
  />
)

const renderSubContent = item => (
  <View accessibilityLabel="SubContentItem" style={styles.subContentItem}>
    <Text accessibilityLabel="TextFullName" style={styles.title}>
      {item.firstName} {item.lastName}
    </Text>
    <Text accessibilityLabel="AgeText" style={styles.subtitle}>
      {item.age}
    </Text>
  </View>
)

const renderImage = item => (
  <Image
    accessibilityLabel="ImageItem"
    source={{ uri: item.photo === emptyImage ? defaultProfilePic : item.photo }}
    style={styles.image}
  />
)

const renderContent = item => (
  <View accessibilityLabel="ContentItem" style={styles.contentItem}>
    {renderImage(item)}
    {renderSubContent(item)}
  </View>
)

export const navigateToContactDetail = (state, item) => () => {
  state.navigation.navigate(Routes.DetailContact, {
    id: item.id
  })
}

const useContact = () => {
  const navigation = useNavigation()

  const state = {
    navigation
  }

  return state
}

const Contact = ({ item }) => {
  const state = useContact()

  return (
    <TouchableOpacity
      accessibilityLabel="ContainerItem"
      style={styles.containerItem}
      onPress={navigateToContactDetail(state, item)}
      key={item.id}
    >
      {renderContent(item)}
      {renderIcon(state)}
    </TouchableOpacity>
  )
}

export default Contact
