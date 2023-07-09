import React from 'react'
import renderer from 'react-test-renderer'

import { mockContact } from '../../fixture'

import CreateContact from './createContact.component'

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

describe('Detail Contact Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render create contact', () => {
    const form = {
      photo: '',
      firstName: '',
      lastName: '',
      age: ''
    }
    const loader = false
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([loader, {}])
    React.useState = jest.fn().mockReturnValue([form, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [form, setStateMock])
      .mockImplementationOnce(() => [loader, setStateMock])

    const rendered = renderer.create(<CreateContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render edit contact', () => {
    const route = {
      params: {
        isEdit: true
      }
    }
    const form = {
      photo: mockContact.data.data.photo,
      firstName: mockContact.data.data.firstName,
      lastName: mockContact.data.data.lastName,
      age: mockContact.data.data.age.toString()
    }
    const loader = false
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([loader, {}])
    React.useState = jest.fn().mockReturnValue([form, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [form, setStateMock])
      .mockImplementationOnce(() => [loader, setStateMock])

    const rendered = renderer.create(<CreateContact route={route} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
