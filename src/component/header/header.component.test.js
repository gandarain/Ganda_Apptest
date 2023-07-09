import { onPressBackButton } from './header.component'

jest
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        goBack: jest.fn()
      })
    })
  }))
  .mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')

describe('Header Component', () => {
  it('should call goBack onPressBackButton', () => {
    const mockNavigation = {
      goBack: jest.fn()
    }

    onPressBackButton(mockNavigation)()

    expect(mockNavigation.goBack).toHaveBeenCalled()
  })
})
