import React from 'react'
import renderer from 'react-test-renderer'

import Header from './header.component'

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
  const mockProps = {
    title: 'title',
    showBackButton: false
  }

  it('should render header without back button', () => {
    const rendered = renderer.create(<Header {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render header with back button', () => {
    mockProps.showBackButton = true
    const rendered = renderer.create(<Header {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
