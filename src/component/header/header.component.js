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

import styles from './header.component.styles'

export const onPressBackButton = navigation => () => {
  navigation.goBack()
}

const renderLeftButton = navigation => (
  <TouchableOpacity
    accessibilityLabel="ButtonLeft"
    onPress={onPressBackButton(navigation)}
  >
    <Icon
      accessibilityLabel="IconLeft"
      name="arrow-left"
      size={styles.leftIcon.size}
      color={styles.leftIcon.color}
    />
  </TouchableOpacity>
)

const renderStatusBar = () => (
  <StatusBar
    accessibilityLabel="StatusBarHeader"
    barStyle={styles.statusBar.barStyle}
    hidden={false}
    backgroundColor={styles.statusBar.backgroundColor}
    translucent
  />
)

const renderLeft = (props, navigation) => (
  <View accessibilityLabel="ContainerLeft" style={styles.leftContainer}>
    {props.showBackButton && renderLeftButton(navigation)}
  </View>
)

const renderBody = props => (
  <View accessibilityLabel="ContainerBody" style={styles.bodyContainer}>
    <View accessibilityLabel="SubContainerBody">
      <Text
        accessibilityLabel="TextBody"
        numberOfLines={1}
        style={styles.textBody}
      >
        {props.title}
      </Text>
    </View>
  </View>
)

const Header = props => {
  const navigation = useNavigation()

  return (
    <SafeAreaView
      accessibilityLabel="SafeAreaViewHeader"
      style={styles.containerSafeArea}
    >
      <View accessibilityLabel="ViewHeader">
        {renderStatusBar(props, navigation)}
        <View accessibilityLabel="ContainerHeader" style={styles.container}>
          {renderLeft(props)}
          {renderBody(props)}
          <View
            accessibilityLabel="ContainerRight"
            style={styles.rightContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
