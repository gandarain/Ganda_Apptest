import React from 'react'
import { View, Image, Text, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import images from '../../asset/image'
import Routes from '../../navigation/routes'

import styles from './splash.component.styles'

const { logo } = images

export const navigateToListContact = state => {
  setTimeout(() => {
    state.navigation.navigate(Routes.ListContact)
  }, 3000)
}

const useSplash = () => {
  const navigation = useNavigation()

  const state = {
    navigation
  }

  React.useEffect(() => {
    navigateToListContact(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

const Splash = () => {
  useSplash()

  return (
    <View accessibilityLabel="ContainerSplash" style={styles.container}>
      <Image
        accessibilityLabel="ImageSplash"
        source={logo}
        style={styles.logo}
      />
      <Text accessibilityLabel="TitleSplash" style={styles.title}>
        Contact
      </Text>
      <ActivityIndicator
        accessibilityLabel="ActivityIndicator"
        size="large"
        color={styles.activityIndicator.color}
      />
    </View>
  )
}

export default Splash
