import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import styles from './header.styles'

const renderLeft = navigation => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon
      name="arrow-left"
      size={styles.leftIcon.size}
      color={styles.leftIcon.color}
    />
  </TouchableOpacity>
)

const renderBody = title => (
  <View>
    <Text numberOfLines={1} style={styles.textBody}>
      {title}
    </Text>
  </View>
)

const Header = props => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <View>
        <StatusBar
          barStyle={styles.statusBar.barStyle}
          hidden={false}
          backgroundColor={styles.statusBar.backgroundColor}
          translucent
        />
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            {props.showBackButton && renderLeft(navigation)}
          </View>
          <View style={styles.bodyContainer}>{renderBody(props.title)}</View>
          <View style={styles.rightContainer} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
