import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles from './loading.styles'

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={styles.loadingColor.color} />
  </View>
)

export default Loading
