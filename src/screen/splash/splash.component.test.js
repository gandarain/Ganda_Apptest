import React from 'react'

import Routes from '../../navigation/routes'
import { navigateToListContact } from './splash.component'

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

  it('should navigate to ListContact on navigateToListContact', () => {
    const mockState = {
      navigation: {
        navigate: jest.fn()
      }
    }

    navigateToListContact(mockState)

    jest.runAllTimers()

    expect(mockState.navigation.navigate).toHaveBeenCalledWith(
      Routes.ListContact
    )
  })
})
