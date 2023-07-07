import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles from './loading.component.styles'

const Loading = () => (
  <View accessibilityLabel="ContainerLoading" style={styles.container}>
    <ActivityIndicator
      accessibilityLabel="ActivityIndicator"
      size="large"
      color={styles.loadingColor.color}
    />
  </View>
)

export default Loading
