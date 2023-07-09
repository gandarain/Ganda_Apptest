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
    const mockItem = {
      id: 'id'
    }

    navigateToContactDetail(mockState, mockItem)()

    expect(mockState.navigation.navigate).toHaveBeenCalledWith(
      Routes.DetailContact,
      {
        id: mockItem.id
      }
    )
  })
})
