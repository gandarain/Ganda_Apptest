import { Alert } from 'react-native'

import Service from '../../service'
import { mockContact } from '../../fixture'
import Routes from '../../navigation/routes'

import {
  deleteHandler,
  deleteConfirmation,
  submitHandler,
  submitConfirmation,
  editHandler,
  editConfirmation,
  submitButtonHandler,
  onCloseLoaderHandler
} from './createContact.component'

jest
  .mock('../../component/header', () => 'Header')
  .mock('../../component/loader', () => 'Loader')
  .mock('react-native-image-picker', () => ({
    launchImageLibrary: jest.fn()
  }))
  .mock('react-native-config', () => ({
    BASE_URL: ''
  }))
  .mock('react-redux', () => ({
    useDispatch: jest.fn()
  }))
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))
  .mock('formik', () => ({
    Formik: 'Formik'
  }))
  .mock('../../service', () => ({
    get: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
    put: jest.fn()
  }))

describe('Create Contact Component', () => {
  jest.spyOn(Alert, 'alert')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('deleteHandler', () => {
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    it('should call correct state when deleteHandler return success', async () => {
      Service.delete.mockImplementation(() => Promise.resolve())

      await deleteHandler(mockState)()

      expect(mockState.navigation.goBack).toBeCalled()
      expect(mockState.setLoader).toHaveBeenCalledWith(false)
    })

    it('should call correct state when deleteHandler return error', async () => {
      Service.delete.mockImplementation(() => Promise.reject(new Error()))

      await deleteHandler(mockState)()

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(mockState.setLoader).toHaveBeenCalledWith(false)

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('deleteConfirmation', () => {
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    it('should call correct button alert when deleteConfirmation ok button pressed', () => {
      deleteConfirmation(mockState)()

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(Alert.alert).toBeCalled()
    })

    it('should call correct button alert when deleteConfirmation ok cancel pressed', () => {
      deleteConfirmation(mockState)()

      Alert.alert.mock.calls[0][2][1].onPress()

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('submitHandler', () => {
    const mockValues = {
      age: '10'
    }
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    it('should call correct state when submitHandler return success', async () => {
      Service.post.mockImplementation(() => Promise.resolve())

      await submitHandler(mockValues, mockState)()

      expect(mockState.navigation.goBack).toBeCalled()
      expect(mockState.setLoader).toHaveBeenCalledWith(false)
    })

    it('should call correct state when submitHandler return error', async () => {
      Service.post.mockImplementation(() => Promise.reject(new Error()))

      await submitHandler(mockValues, mockState)()

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(mockState.setLoader).toHaveBeenCalledWith(false)

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('submitConfirmation', () => {
    const mockValues = {
      age: '10'
    }
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    it('should call correct button alert when submitConfirmation ok button pressed', () => {
      submitConfirmation(mockValues, mockState)

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(Alert.alert).toBeCalled()
    })

    it('should call correct button alert when submitConfirmation ok cancel pressed', () => {
      submitConfirmation(mockValues, mockState)

      Alert.alert.mock.calls[0][2][1].onPress()

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('editHandler', () => {
    const mockValues = {
      photo: mockContact.data.data.photo,
      firstName: mockContact.data.data.firstName,
      lastName: mockContact.data.data.lastName,
      age: '10'
    }
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        navigate: jest.fn()
      }
    }

    it('should call correct state when editHandler return success', async () => {
      Service.put.mockImplementation(() => Promise.resolve())

      await editHandler(mockValues, mockState)()

      expect(mockState.navigation.navigate).toHaveBeenCalledWith(
        Routes.ListContact
      )
      expect(mockState.setLoader).toHaveBeenCalledWith(false)
    })

    it('should call correct state when editHandler return error', async () => {
      Service.put.mockImplementation(() => Promise.reject(new Error()))

      await editHandler(mockValues, mockState)()

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(mockState.setLoader).toHaveBeenCalledWith(false)

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('editConfirmation', () => {
    const mockValues = {
      photo: mockContact.data.data.photo,
      firstName: mockContact.data.data.firstName,
      lastName: mockContact.data.data.lastName,
      age: '10'
    }
    const mockState = {
      setLoader: jest.fn(),
      dispatch: () => ({
        setLoadingListContacts: jest.fn()
      }),
      navigation: {
        goBack: jest.fn()
      }
    }

    it('should call correct button alert when editConfirmation ok button pressed', () => {
      editConfirmation(mockValues, mockState)

      Alert.alert.mock.calls[0][2][0].onPress()

      expect(Alert.alert).toBeCalled()
    })

    it('should call correct button alert when editConfirmation ok cancel pressed', () => {
      editConfirmation(mockValues, mockState)

      Alert.alert.mock.calls[0][2][1].onPress()

      expect(Alert.alert).toBeCalled()
    })
  })

  describe('submitButtonHandler', () => {
    const mockValues = {
      photo: mockContact.data.data.photo,
      firstName: mockContact.data.data.firstName,
      lastName: mockContact.data.data.lastName,
      age: '10'
    }
    const mockState = {
      isEdit: false
    }
    const mockErrors = {
      photo: false,
      firstName: false,
      lastName: false,
      age: true
    }

    it('should call correct nothing when errors is not empty', () => {
      const expectedResult = false

      const result = submitButtonHandler(mockValues, mockErrors, mockState)()

      expect(result).toBe(expectedResult)
    })

    it('should call correct function when errors is empty', () => {
      mockErrors.age = false

      const result = submitButtonHandler(mockValues, mockErrors, mockState)()

      expect(result).not.toBe(true)
    })

    it('should call correct function when errors is empty and isEdit true', () => {
      mockErrors.age = false
      mockState.isEdit = true

      const result = submitButtonHandler(mockValues, mockErrors, mockState)()

      expect(result).not.toBe(true)
    })
  })

  describe('onCloseLoaderHandler', () => {
    const mockState = {
      setLoader: jest.fn()
    }

    it('should call correct state when onCloseLoaderHandler', () => {
      onCloseLoaderHandler(mockState)()

      expect(mockState.setLoader).toHaveBeenCalledWith(false)
    })
  })
})
