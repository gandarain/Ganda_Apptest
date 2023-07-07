import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './buttonFull.styles'

const ButtonFull = ({ title, onPress, withBorder }) => (
  <TouchableOpacity onPress={onPress} style={styles.button(withBorder)}>
    <Text style={styles.textButton(withBorder)}>{title}</Text>
  </TouchableOpacity>
)

export default ButtonFull
