import { mockContacts } from '../../fixture'
import Routes from '../../navigation/routes'
import Service from '../../service'

import {
  getContactsHandler,
  navigateToContactDetail,
  onRefreshHandler,
  renderItem
} from './listContact.component'

jest
  .mock('./contact', () => 'Contact')
  .mock('../../component/header', () => 'Header')
  .mock('react-native-config', () => ({
    BASE_URL: ''
  }))
  .mock('../../service', () => ({
    get: jest.fn()
  }))
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))

describe('List Contact Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getContactsHandler', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call correct state when getContactsHandler is return success', async () => {
      const mockState = {
        setContacts: jest.fn(),
        setLoading: jest.fn()
      }

      Service.get.mockImplementation(() => Promise.resolve(mockContacts))

      await getContactsHandler(mockState)

      expect(mockState.setContacts).toHaveBeenCalledWith(mockContacts.data.data)
      expect(mockState.setLoading).toHaveBeenCalledWith(false)
    })

    it('should call correct state when getContactsHandler is return error', async () => {
      const mockState = {
        setContacts: jest.fn(),
        setLoading: jest.fn()
      }

      Service.get.mockImplementation(() => Promise.reject(new Error()))

      await getContactsHandler(mockState)

      expect(mockState.setContacts).toHaveBeenCalledWith([])
      expect(mockState.setLoading).toHaveBeenCalledWith(false)
    })
  })

  it('should call correct state when navigateToContactDetail', () => {
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

  it('should call correct state when onRefreshHandler', () => {
    const mockState = {
      setLoading: jest.fn(),
      setContacts: jest.fn()
    }

    onRefreshHandler(mockState)()

    expect(mockState.setLoading).toHaveBeenCalledWith(true)
    expect(mockState.setContacts).toHaveBeenCalledWith([])
  })

  it('should return Contact component when renderItem', () => {
    const expectedResult = 'Contact'
    const result = renderItem()(mockContacts.data.data[0])

    expect(result.type).toBe(expectedResult)
  })
})
