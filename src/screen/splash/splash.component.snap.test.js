import React from 'react'
import renderer from 'react-test-renderer'

import Splash from './splash.component'

jest
  .mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigation: () => ({
        navigate: jest.fn()
      })
    })
  }))
  .mock('../../asset/image', () => ({
    images: () => ({
      logo: 'Logo'
    })
  }))

jest.useFakeTimers()

describe('Splash Component', () => {
  beforeEach(() => {
    let useEffect
    const mockUseEffect = () => {
      useEffect.mockImplementationOnce(f => f())
    }
    useEffect = jest.spyOn(React, 'useEffect')

    mockUseEffect()
  })

  it('should render splash component', () => {
    const rendered = renderer.create(<Splash />)
    const tree = rendered.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
