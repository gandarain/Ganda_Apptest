import React from 'react'
import renderer from 'react-test-renderer'

import Loader from './loader.component'

describe('Loader Component', () => {
  const mockProps = {
    visible: true,
    onClose: jest.fn()
  }

  it('should render loader when visible is true', () => {
    const rendered = renderer.create(<Loader {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render loader when visible is false', () => {
    mockProps.visible = false
    const rendered = renderer.create(<Loader {...mockProps} />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
