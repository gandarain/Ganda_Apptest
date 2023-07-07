import { StyleSheet } from 'react-native'

import color from '../../constant/color'
import { fontSize, fontFamily } from '../../constant/font'

const styles = StyleSheet.create({
  button: withBorder => ({
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: withBorder ? color.white : color.theme,
    borderColor: color.theme,
    borderWidth: 1,
    borderRadius: 8
  }),
  textButton: withBorder => ({
    color: withBorder ? color.theme : color.white,
    fontSize: fontSize.BIG,
    fontFamily: fontFamily.BOLD
  })
})

export default styles
