import React from 'react'
import renderer from 'react-test-renderer'

import { mockContact } from '../../fixture'

import DetailContact from './detailContact.component'

jest
  .mock('../../component/header', () => 'Header')
  .mock('../../component/loading', () => 'Loading')
  .mock('../../component/loader', () => 'Loader')
  .mock('react-native-config', () => ({
    BASE_URL: ''
  }))
  .mock('../../service', () => ({
    get: () => Promise.resolve(mockContact)
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
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading', () => {
    const loading = true
    const contact = {}
    const loader = false
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([loader, {}])
    React.useState = jest.fn().mockReturnValue([contact, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [loading, setStateMock])
      .mockImplementationOnce(() => [contact, setStateMock])
      .mockImplementationOnce(() => [loader, setStateMock])

    const rendered = renderer.create(<DetailContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render detail contact component', () => {
    const loading = false
    const contact = mockContact.data.data
    const loader = false
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([loader, {}])
    React.useState = jest.fn().mockReturnValue([contact, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [loading, setStateMock])
      .mockImplementationOnce(() => [contact, setStateMock])
      .mockImplementationOnce(() => [loader, setStateMock])

    const rendered = renderer.create(<DetailContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render loader', () => {
    const loading = false
    const contact = mockContact.data.data
    const loader = true
    const setStateMock = jest.fn()

    React.useState = jest.fn().mockReturnValue([loader, {}])
    React.useState = jest.fn().mockReturnValue([contact, {}])
    React.useState = jest.fn().mockReturnValue([loading, {}])

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [loading, setStateMock])
      .mockImplementationOnce(() => [contact, setStateMock])
      .mockImplementationOnce(() => [loader, setStateMock])

    const rendered = renderer.create(<DetailContact />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
