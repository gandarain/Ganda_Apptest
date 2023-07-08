import React from 'react'
import renderer from 'react-test-renderer'

import Loading from './loading.component'

describe('Loading Component', () => {
  it('should render snapshot', () => {
    const rendered = renderer.create(<Loading />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
