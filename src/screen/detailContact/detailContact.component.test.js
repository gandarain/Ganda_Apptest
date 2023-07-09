import { Alert } from 'react-native'

import { mockContact } from '../../fixture'
import Routes from '../../navigation/routes'
import Service from '../../service'

import {
  getContactHandler,
  navigateToCreateContact,
  deleteHandler,
  deleteConfirmation,
  onCloseLoaderHandler
} from './detailContact.component'

jest
  .mock('../../component/header', () => 'Header')
  .mock('../../component/loading', () => 'Loading')
  .mock('../../component/loader', () => 'Loader')
  .mock('react-native-config', () => ({
    BASE_URL: ''
  }))
  .mock('../../service', () => ({
    get: jest.fn(),
    delete: jest.fn()
  }))
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))
  .mock('react-redux', () => ({
    useDispatch: jest.fn()
  }))
  .mock('../../redux/action/listContactsActions', () => ({
    setLoadingListContacts: jest.fn()
  }))

describe('Detail Contact Component', () => {
  jest.spyOn(Alert, 'alert')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getContactHandler', () => {
    it('should call correct state when getContactHandler return success', async () => {
      const mockState = {
        setContact: jest.fn(),
        setLoading: jest.fn()
      }

      Service.get.mockImplementation(() => Promise.resolve(mockContact))

      await getContactHandler(mockState)

      expect(mockState.setContact).toHaveBeenCalledWith(mockContact.data.data)
      expect(mockState.setLoading).toHaveBeenCalledWith(false)
    })

    it('should call correct state when getContactHandler return error', async () => {
      const mockState = {
        setContact: jest.fn(),
        setLoading: jest.fn()
      }

      Service.get.mockImplementation(() => Promise.reject(new Error()))

      await getContactHandler(mockState)

      expect(mockState.setContact).toHaveBeenCalledWith({})
      expect(mockState.setLoading).toHaveBeenCalledWith(false)
    })
  })

  it('should call correct state when navigateToCreateContact', async () => {
    const mockState = {
      navigation: {
        navigate: jest.fn()
      },
      contact: mockContact.data.data
    }

    navigateToCreateContact(mockState)()

    expect(mockState.navigation.navigate).toHaveBeenCalledWith(
      Routes.CreateContact,
      {
        isEdit: true,
        id: mockState.contact.id,
        photo: mockState.contact.photo,
        firstName: mockState.contact.firstName,
        lastName: mockState.contact.lastName,
        age: mockState.contact.age
      }
    )
  })

  describe('deleteHandler', () => {
    it('should call correct state when deleteHandler return success', async () => {
      const mockState = {
        setLoader: jest.fn(),
        dispatch: () => ({
          setLoadingListContacts: jest.fn()
        }),
        navigation: {
          goBack: jest.fn()
        }
      }

      Service.delete.mockImplementation(() => Promise.resolve())

      await deleteHandler(mockState)()

      expect(mockState.setLoader).toHaveBeenCalledWith(false)
      expect(mockState.navigation.goBack).toBeCalled()
    })

    it('should call correct state when deleteHandler return error', async () => {
      const mockState = {
        setLoader: jest.fn(),
        dispatch: () => ({
          setLoadingListContacts: jest.fn()
        }),
        navigation: {
          goBack: jest.fn()
        }
      }

      Service.delete.mockImplementation(() => Promise.reject(new Error()))

      await deleteHandler(mockState)()

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(Alert.alert).toBeCalled()
    })
  })

  it('should return correct value when deleteConfirmation', () => {
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    deleteConfirmation(mockState)()

    expect(Alert.alert).toBeCalled()
  })

  it('should call correct button alert when deleteConfirmation cancel button pressed', () => {
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    deleteConfirmation(mockState)()

    Alert.alert.mock.calls[0][2][1].onPress()

    expect(Alert.alert).toBeCalled()
  })

  it('should call correct state when onCloseLoaderHandler', async () => {
    const mockState = {
      setLoader: jest.fn()
    }

    onCloseLoaderHandler(mockState)()

    expect(mockState.setLoader).toHaveBeenCalledWith(false)
  })
})
