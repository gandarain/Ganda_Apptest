import React from 'react'
import renderer from 'react-test-renderer'
import { useSelector } from 'react-redux'

import { mockContacts } from '../../fixture'

import ListContact from './listContact.component'

jest
  .mock('./contact', () => 'Contact')
  .mock('../../component/header', () => 'Header')
  .mock('react-native-config', () => ({
    BASE_URL: ''
  }))
  .mock('../../service', () => ({
    get: () => Promise.resolve(mockContacts)
  }))
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))
  .mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
  }))
  .mock('../../redux/action/listContactsActions', () => ({
    setLoadingListContacts: jest.fn()
  }))

const mockStore = {
  listContactsReducer: {
    loading: false
  }
}

describe('List Contact Component', () => {
  beforeEach(() => {
    useSelector.mockImplementation(selector => selector(mockStore))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading', () => {
    const loading = true
    const contacts = []
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([contacts, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [contacts, setStateMock])
      .mockImplementationOnce(() => [loading, setStateMock])

    const rendered = renderer.create(<ListContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render list contact component', () => {
    const loading = false
    const contacts = mockContacts
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([contacts, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [contacts, setStateMock])
      .mockImplementationOnce(() => [loading, setStateMock])

    const rendered = renderer.create(<ListContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render loading when listContactsReducer loading is true', () => {
    const loading = false
    const contacts = mockContacts
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([contacts, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])
    React.useEffect = jest.fn()

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [contacts, setStateMock])
      .mockImplementationOnce(() => [loading, setStateMock])
    jest.spyOn(React, 'useEffect')

    const rendered = renderer.create(<ListContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
