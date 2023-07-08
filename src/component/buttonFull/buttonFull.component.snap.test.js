import React from 'react'
import renderer from 'react-test-renderer'

import ButtonFull from './buttonFull.component'

describe('ButtonFull Component', () => {
  const mockProps = {
    title: 'title',
    onPress: jest.fn(),
    withBorder: false
  }

  it('should render button full without border', () => {
    const rendered = renderer.create(<ButtonFull {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render button full with border', () => {
    mockProps.withBorder = true
    const rendered = renderer.create(<ButtonFull {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
