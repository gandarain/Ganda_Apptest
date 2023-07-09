import React from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'

import color from '../../constant/color'

import styles from './loader.component.styles'

const Loader = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={color.theme} />
      </View>
    </Modal>
  )
}

export default Loader
