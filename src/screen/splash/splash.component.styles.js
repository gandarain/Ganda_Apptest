import { StyleSheet } from 'react-native'

import { fontFamily, fontSize } from '../../constant/font'
import color from '../../constant/color'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.theme
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    fontFamily: fontFamily.BOLD,
    fontSize: fontSize.BIG,
    color: color.white,
    marginVertical: 20
  },
  activityIndicator: {
    color: color.white
  }
})

export default styles
