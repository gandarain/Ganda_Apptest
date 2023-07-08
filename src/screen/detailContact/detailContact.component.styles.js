import { StyleSheet } from 'react-native'

import { fontFamily, fontSize } from '../../constant/font'
import color from '../../constant/color'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
  },
  image: {
    width: '100%',
    height: 300
  },
  content: {
    marginTop: 15,
    marginHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.border
  },
  title: {
    fontFamily: fontFamily.BOLD,
    fontSize: fontSize.MEDIUM,
    color: color.font,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: fontFamily.REGULAR,
    fontSize: fontSize.MEDIUM,
    color: color.font
  }
})

export default styles
