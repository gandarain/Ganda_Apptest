import { StyleSheet, Platform } from 'react-native'

import { fontFamily, fontSize, iconSize } from '../../../constant/font'
import color from '../../../constant/color'

const styles = StyleSheet.create({
  containerItem: {
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: color.white,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: Platform.OS === 'android' ? 0.4 : 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  subContentItem: {
    marginLeft: 15
  },
  title: {
    fontFamily: fontFamily.BOLD,
    fontSize: fontSize.MEDIUM,
    color: color.font
  },
  subtitle: {
    fontFamily: fontFamily.REGULAR,
    fontSize: fontSize.MEDIUM,
    color: color.font
  },
  icon: {
    size: iconSize.BIG,
    color: color.theme
  }
})

export default styles
