import Routes from '../../../navigation/routes'

import { navigateToContactDetail } from './contact.component'

jest
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))
  .mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')

describe('Contact Component', () => {
  it('should call navigate on navigateToContactDetail', () => {
    const mockState = {
      navigation: {
        navigate: jest.fn()
      }
    }

    navigateToContactDetail(mockState)()

    expect(mockState.navigation.navigate).toHaveBeenCalledWith(
      Routes.DetailContact
    )
  })
})
