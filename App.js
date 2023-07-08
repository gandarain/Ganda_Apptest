import React from 'react'
import { LogBox } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'

import providerStore from './src/redux'
import Navigation from './src/navigation'

LogBox.ignoreLogs(['Warning: ...'])

const App = () => (
  <StoreProvider store={providerStore}>
    <Navigation />
  </StoreProvider>
)

export default App
