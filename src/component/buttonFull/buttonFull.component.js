import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import styles from './buttonFull.component.styles'

const ButtonFull = ({ title, onPress, withBorder }) => (
  <TouchableOpacity
    accessibilityLabel="ButtonFull"
    onPress={onPress}
    style={styles.button(withBorder)}
  >
    <Text
      accessibilityLabel="TextButtonFull"
      style={styles.textButton(withBorder)}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

export default ButtonFull
