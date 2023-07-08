import React from 'react'
import renderer from 'react-test-renderer'

import { mockContact } from '../../../fixture'

import Contact from './contact.component'

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
  it('should render contact component', () => {
    const rendered = renderer.create(<Contact item={mockContact.data.data} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
