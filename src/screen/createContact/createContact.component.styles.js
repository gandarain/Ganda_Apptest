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
    paddingBottom: 50
  },
  formFieldContainer: {
    margin: 15
  },
  title: {
    fontFamily: fontFamily.BOLD,
    fontSize: fontSize.MEDIUM,
    color: color.font,
    marginBottom: 10
  },
  textInput: {
    fontFamily: fontFamily.REGULAR,
    fontSize: fontSize.MEDIUM,
    color: color.font,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    paddingBottom: 10
  },
  containerButton: {
    borderTopColor: color.border,
    borderTopWidth: 1,
    padding: 15
  },
  button: {
    backgroundColor: color.theme,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontFamily: fontFamily.BOLD,
    fontSize: fontSize.MEDIUM,
    color: color.white
  },
  containerErrorText: {
    width: '100%',
    marginHorizontal: 15
  },
  textError: {
    fontFamily: fontFamily.SEMI_BOLD,
    fontSize: fontSize.SMALL,
    color: color.error
  }
})

export default styles
