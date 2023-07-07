import { StyleSheet, Platform, StatusBar } from 'react-native'

import { fontFamily, fontSize, iconSize } from '../../constant/font'
import color from '../../constant/color'

const styles = StyleSheet.create({
  containerSafeArea: {
    backgroundColor: color.theme
  },
  container: {
    backgroundColor: color.theme,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  statusBar: {
    barStyle: Platform.OS === 'android' ? 'light-content' : 'dark-content',
    backgroundColor: color.theme
  },
  leftContainer: {
    width: '15%'
  },
  leftIcon: {
    size: iconSize.BIG,
    color: color.white
  },
  bodyContainer: {
    width: '70%',
    alignItems: 'center'
  },
  textBody: {
    color: color.white,
    fontSize: fontSize.BIG,
    fontFamily: fontFamily.BOLD
  },
  textSubBody: {
    color: color.white,
    fontSize: fontSize.MEDIUM,
    fontFamily: fontFamily.REGULAR,
    textAlign: 'center'
  },
  rightContainer: {
    width: '15%',
    alignItems: 'flex-end'
  }
})

export default styles
